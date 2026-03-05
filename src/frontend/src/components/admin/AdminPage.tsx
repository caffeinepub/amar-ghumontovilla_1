import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import type { LiteraryContent } from "../../backend";
import {
  useCreateDraft,
  useDeleteContent,
  useDrafts,
  usePublishContent,
  useUpdateDraft,
} from "../../hooks/useAdminLiteraryContent";
import { usePublishedContent } from "../../hooks/usePublishedLiteraryContent";

export default function AdminPage() {
  const { data: drafts = [], isLoading: draftsLoading } = useDrafts();
  const { data: published = [], isLoading: publishedLoading } =
    usePublishedContent();
  const createDraft = useCreateDraft();
  const updateDraft = useUpdateDraft();
  const publishContent = usePublishContent();
  const deleteContent = useDeleteContent();

  const [selectedItem, setSelectedItem] = useState<LiteraryContent | null>(
    null,
  );
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 5000);
    } else {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const handleSelectItem = (item: LiteraryContent) => {
    setSelectedItem(item);
    setEditTitle(item.title);
    setEditContent(item.content);
    setIsCreatingNew(false);
  };

  const handleCreateNew = () => {
    setSelectedItem(null);
    setEditTitle("");
    setEditContent("");
    setIsCreatingNew(true);
  };

  const handleSaveDraft = async () => {
    try {
      if (isCreatingNew) {
        await createDraft.mutateAsync({
          title: editTitle,
          content: editContent,
        });
        showMessage("Draft created successfully!");
        setIsCreatingNew(false);
        setEditTitle("");
        setEditContent("");
      } else if (selectedItem) {
        await updateDraft.mutateAsync({
          id: selectedItem.id,
          title: editTitle,
          content: editContent,
        });
        showMessage("Draft saved successfully!");
      }
    } catch (error: any) {
      showMessage(error.message || "Failed to save draft", true);
    }
  };

  const handlePublish = async () => {
    if (!selectedItem) return;

    try {
      await publishContent.mutateAsync(selectedItem.id);
      showMessage("Content published successfully!");
      setSelectedItem(null);
      setEditTitle("");
      setEditContent("");
    } catch (error: any) {
      showMessage(error.message || "Failed to publish content", true);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      await deleteContent.mutateAsync(selectedItem.id);
      showMessage("Content deleted successfully!");
      setSelectedItem(null);
      setEditTitle("");
      setEditContent("");
    } catch (error: any) {
      showMessage(error.message || "Failed to delete content", true);
    }
  };

  const getItemStatus = (item: LiteraryContent) => {
    const isPublished = published.some((p) => p.id === item.id);
    return isPublished ? "Published" : "Draft Only";
  };

  if (draftsLoading || publishedLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading admin panel...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage your literary content - create drafts and publish them
        </p>
      </div>

      {successMessage && (
        <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert className="mb-6 border-red-500 bg-red-50 dark:bg-red-950">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Content List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Content List</CardTitle>
            <CardDescription>
              Select an item to edit or create new
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={handleCreateNew}
              className="w-full gap-2"
              variant={isCreatingNew ? "default" : "outline"}
            >
              <Plus size={16} />
              Create New
            </Button>

            <Separator className="my-4" />

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {drafts.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={`w-full text-left p-3 rounded-md border transition-colors ${
                    selectedItem?.id === item.id
                      ? "bg-accent border-primary"
                      : "hover:bg-accent/50 border-border"
                  }`}
                >
                  <div className="font-medium text-sm line-clamp-1">
                    {item.title}
                  </div>
                  <Badge
                    variant={item.isPublished ? "default" : "secondary"}
                    className="mt-1 text-xs"
                  >
                    {getItemStatus(item)}
                  </Badge>
                </button>
              ))}

              {drafts.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No drafts yet. Create your first one!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {isCreatingNew
                ? "Create New Content"
                : selectedItem
                  ? "Edit Content"
                  : "Select or Create Content"}
            </CardTitle>
            <CardDescription>
              {isCreatingNew || selectedItem
                ? "Edit your content and save as draft, then publish when ready"
                : "Choose an item from the list or create a new one"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isCreatingNew || selectedItem ? (
              <>
                <div>
                  <label
                    htmlFor="edit-title"
                    className="text-sm font-medium mb-2 block"
                  >
                    Title
                  </label>
                  <Input
                    id="edit-title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Enter title..."
                    className="font-bengali"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-content"
                    className="text-sm font-medium mb-2 block"
                  >
                    Content (HTML supported)
                  </label>
                  <Textarea
                    id="edit-content"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Enter content... You can use HTML tags like <p>, <br/>, etc."
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  <Button
                    onClick={handleSaveDraft}
                    disabled={
                      !editTitle.trim() ||
                      !editContent.trim() ||
                      updateDraft.isPending ||
                      createDraft.isPending
                    }
                    className="gap-2"
                  >
                    {updateDraft.isPending || createDraft.isPending ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Save size={16} />
                    )}
                    Save Draft
                  </Button>

                  {selectedItem && !isCreatingNew && (
                    <>
                      <Button
                        onClick={handlePublish}
                        disabled={publishContent.isPending}
                        variant="default"
                        className="gap-2 bg-green-600 hover:bg-green-700"
                      >
                        {publishContent.isPending ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Upload size={16} />
                        )}
                        Publish
                      </Button>

                      <Button
                        onClick={handleDelete}
                        disabled={deleteContent.isPending}
                        variant="destructive"
                        className="gap-2"
                      >
                        {deleteContent.isPending ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Trash2 size={16} />
                        )}
                        Delete
                      </Button>
                    </>
                  )}
                </div>

                {selectedItem && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Status:</strong> {getItemStatus(selectedItem)}
                      <br />
                      <span className="text-xs text-muted-foreground">
                        Save your changes as draft first, then click Publish to
                        make it live for everyone.
                      </span>
                    </AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <p>
                  Select an item from the list to edit, or create a new one.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
