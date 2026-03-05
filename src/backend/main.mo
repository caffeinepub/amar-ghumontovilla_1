import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Specify the data migration function in with-clause

actor {
  // Initialize the access control state and mixin authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data Types
  type Comment = { author : Text; content : Text; timestamp : Int };
  type Message = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type LiteraryContent = {
    id : Text;
    title : Text;
    content : Text;
    author : Principal;
    isPublished : Bool;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  // Module for custom comparison of comments by timestamp
  module Comment {
    public func compareByTimestamp(a : Comment, b : Comment) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  // Persistent Lists
  let homeComments = List.empty<Comment>();
  let poemsComments = List.empty<Comment>();
  let storiesComments = List.empty<Comment>();
  let essaysComments = List.empty<Comment>();
  let contacts = List.empty<Message>();
  let literaryContentStore = List.empty<LiteraryContent>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Analytics
  let dailyVisits = Map.empty<Int, Nat>();
  var totalVisits = 0;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Record a visit with daily aggregation
  public shared ({ caller }) func recordVisit() : async () {
    let currentDay = Time.now() / (24 * 60 * 60 * 1000000000); // Convert nanoseconds to days

    let todayCount = switch (dailyVisits.get(currentDay)) {
      case (null) { 0 };
      case (?count) { count };
    };

    dailyVisits.add(currentDay, todayCount + 1);
    totalVisits += 1;
  };

  // Get total number of visits
  public query ({ caller }) func getTotalVisits() : async Nat {
    totalVisits;
  };

  // Get visits for a specific day
  public query ({ caller }) func getDailyVisits(day : Int) : async Nat {
    switch (dailyVisits.get(day)) {
      case (null) { Runtime.trap("No data available for the requested day.") };
      case (?count) { count };
    };
  };

  // Add a comment to a specific section
  public shared ({ caller }) func addComment(section : Text, author : Text, content : Text) : async () {
    if (author.trim(#char ' ').size() == 0 or content.trim(#char ' ').size() == 0) {
      Runtime.trap("Author and content must not be empty messages");
    };

    let comment : Comment = { author; content; timestamp = Time.now() };
    switch (section) {
      case ("home") { homeComments.add(comment) };
      case ("poems") { poemsComments.add(comment) };
      case ("stories") { storiesComments.add(comment) };
      case ("essays") { essaysComments.add(comment) };
      case (_) { Runtime.trap("Invalid section") };
    };
  };

  // Sort comments by timestamp
  func sortAndReturnComments(comments : List.List<Comment>) : [Comment] {
    comments.toArray().sort(Comment.compareByTimestamp);
  };

  // Get sorted comments for a specific section
  public query ({ caller }) func getComments(section : Text) : async [Comment] {
    switch (section) {
      case ("home") { sortAndReturnComments(homeComments) };
      case ("poems") { sortAndReturnComments(poemsComments) };
      case ("stories") { sortAndReturnComments(storiesComments) };
      case ("essays") { sortAndReturnComments(essaysComments) };
      case (_) { Runtime.trap("Invalid section") };
    };
  };

  // Add a contact message
  public shared ({ caller }) func addContactMessage(name : Text, email : Text, message : Text) : async () {
    let msg : Message = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contacts.add(msg);
  };

  // Get all contact messages (admin only - contains private user data)
  public query ({ caller }) func getContactMessages() : async [Message] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    contacts.toArray();
  };

  // Literary Content Management

  // Create a draft literary content (owner only)
  public shared ({ caller }) func createDraft(title : Text, content : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only owner can create drafts");
    };

    let id = generateId(title);

    let draft : LiteraryContent = {
      id;
      title;
      content;
      author = caller;
      isPublished = false;
      timestamp = Time.now();
    };

    literaryContentStore.add(draft);
    id;
  };

  // Update a draft literary content (owner only)
  public shared ({ caller }) func updateDraft(id : Text, title : Text, content : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only owner can update drafts");
    };

    let updatedStore = literaryContentStore.map<LiteraryContent, LiteraryContent>(
      func(item) {
        if (item.id == id and not item.isPublished) {
          { item with title = title; content = content }
        } else {
          item
        };
      }
    );

    literaryContentStore.clear();
    literaryContentStore.addAll(updatedStore.values());
  };

  // Publish literary content (owner only)
  public shared ({ caller }) func publishContent(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only owner can publish content");
    };

    let updatedStore = literaryContentStore.map<LiteraryContent, LiteraryContent>(
      func(content) {
        if (content.id == id) { { content with isPublished = true } } else { content };
      }
    );

    literaryContentStore.clear();
    literaryContentStore.addAll(updatedStore.values());
  };

  // Unpublish literary content (owner only)
  public shared ({ caller }) func unpublishContent(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only owner can unpublish content");
    };

    let updatedStore = literaryContentStore.map<LiteraryContent, LiteraryContent>(
      func(content) {
        if (content.id == id) { { content with isPublished = false } } else { content };
      }
    );

    literaryContentStore.clear();
    literaryContentStore.addAll(updatedStore.values());
  };

  // Delete literary content (owner only)
  public shared ({ caller }) func deleteContent(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only owner can delete content");
    };

    let filteredStore = literaryContentStore.filter(func(content) { content.id != id });

    literaryContentStore.clear();
    literaryContentStore.addAll(filteredStore.values());
  };

  // Get all published content (public)
  public query ({ caller }) func getPublishedContent() : async [LiteraryContent] {
    literaryContentStore.filter(func(content) { content.isPublished }).toArray();
  };

  // Get all drafts (owner only)
  public query ({ caller }) func getDrafts() : async [LiteraryContent] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only owner can view drafts");
    };
    literaryContentStore.filter(func(content) { not content.isPublished }).toArray();
  };

  // Get content by ID (public if published, owner only if draft)
  public query ({ caller }) func getContentById(id : Text) : async ?LiteraryContent {
    let result = literaryContentStore.find(func(content) { content.id == id });
    switch (result) {
      case (null) { null };
      case (?content) {
        if (content.isPublished) {
          ?content
        } else {
          // Draft content - only owner can view
          if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
            Runtime.trap("Unauthorized: Only owner can view draft content");
          };
          ?content
        };
      };
    };
  };

  // Generate a unique ID based on title and timestamp
  func generateId(title : Text) : Text {
    title # "_" # debug_show (Time.now());
  };
};
