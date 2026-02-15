import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // Data Types
  type Comment = { author : Text; content : Text; timestamp : Int };
  type Message = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
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

  // Add Comment Functions
  public shared ({ caller }) func addHomeComment(author : Text, content : Text) : async () {
    addComment(homeComments, author, content);
  };

  public shared ({ caller }) func addPoemsComment(author : Text, content : Text) : async () {
    addComment(poemsComments, author, content);
  };

  public shared ({ caller }) func addStoriesComment(author : Text, content : Text) : async () {
    addComment(storiesComments, author, content);
  };

  public shared ({ caller }) func addEssaysComment(author : Text, content : Text) : async () {
    addComment(essaysComments, author, content);
  };

  func addComment(comments : List.List<Comment>, author : Text, content : Text) {
    let comment : Comment = { author; content; timestamp = Time.now() };
    comments.add(comment);
  };

  // Get Comments Functions
  func sortAndReturnComments(comments : List.List<Comment>) : [Comment] {
    comments.toArray().sort(Comment.compareByTimestamp);
  };

  public query ({ caller }) func getHomeComments() : async [Comment] {
    sortAndReturnComments(homeComments);
  };

  public query ({ caller }) func getPoemsComments() : async [Comment] {
    sortAndReturnComments(poemsComments);
  };

  public query ({ caller }) func getStoriesComments() : async [Comment] {
    sortAndReturnComments(storiesComments);
  };

  public query ({ caller }) func getEssaysComments() : async [Comment] {
    sortAndReturnComments(essaysComments);
  };

  // Add Contact Message Function
  public shared ({ caller }) func addContactMessage(name : Text, email : Text, message : Text) : async () {
    let msg : Message = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contacts.add(msg);
  };

  // Get Contact Messages Function
  public query ({ caller }) func getContactMessages() : async [Message] {
    contacts.toArray();
  };
};
