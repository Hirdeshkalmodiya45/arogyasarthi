import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Heart, Share2, Plus, Users, TrendingUp, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Community = () => {
  const [posts, setPosts] = useState<any[]>([
    {
      id: 1,
      author: "Anonymous User",
      state: "Kerala",
      content: "Can anyone recommend a good clinic near Ernakulam for diabetes check-up? Looking for affordable options.",
      category: "Healthcare",
      likes: 12,
      replies: 5,
      timeAgo: "2 hours ago",
      isHelpful: true
    },
    {
      id: 2,
      author: "Health Helper",
      state: "Tamil Nadu",
      content: "Just wanted to share that the mobile health camp will be visiting our area next week. Free check-ups for blood pressure and diabetes!",
      category: "Health News",
      likes: 25,
      replies: 8,
      timeAgo: "4 hours ago",
      isHelpful: false
    },
    {
      id: 3,
      author: "Migrant Worker",
      state: "Karnataka",
      content: "Has anyone faced issues with insurance claims? Need advice on the documentation required.",
      category: "Insurance",
      likes: 7,
      replies: 3,
      timeAgo: "1 day ago",
      isHelpful: true
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Healthcare");
  const { toast } = useToast();

  const categories = ["Healthcare", "Insurance", "Health News", "General Support", "Mental Health"];

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: "You",
        state: "Kerala",
        content: newPost,
        category: selectedCategory,
        likes: 0,
        replies: 0,
        timeAgo: "Just now",
        isHelpful: false
      };
      setPosts([post, ...posts]);
      setNewPost("");
      toast({
        title: "Post Shared",
        description: "Your post has been shared with the community",
      });
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const communityStats = [
    { label: "Active Members", value: "2,847", icon: <Users className="h-5 w-5" /> },
    { label: "Posts This Week", value: "156", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Questions Answered", value: "89", icon: <HelpCircle className="h-5 w-5" /> },
    { label: "Helpful Responses", value: "234", icon: <Heart className="h-5 w-5" /> }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Community Support</h1>
          <p className="text-muted-foreground">Connect, share, and support fellow migrant workers</p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {communityStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="text-primary">{stat.icon}</div>
                <div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="forum" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forum">Community Forum</TabsTrigger>
          <TabsTrigger value="support">Peer Support</TabsTrigger>
          <TabsTrigger value="resources">Shared Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Share with Community
              </CardTitle>
              <CardDescription>
                Ask questions, share experiences, or help others (posts are anonymous)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <Textarea
                placeholder="Share your thoughts, ask questions, or offer help..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handlePostSubmit} className="w-full">
                Share Post
              </Button>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{post.author}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{post.state}</span>
                            <span>•</span>
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    
                    <p className="text-sm leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center gap-4 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                      >
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.replies}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Support</CardTitle>
                <CardDescription>Anonymous support groups and resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-sm">Daily Support Group</p>
                    <p className="text-xs text-muted-foreground">Join daily at 7 PM</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-sm">Crisis Helpline</p>
                    <p className="text-xs text-muted-foreground">24/7 emotional support</p>
                  </div>
                </div>
                <Button variant="health" className="w-full">Join Support Group</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peer Mentorship</CardTitle>
                <CardDescription>Connect with experienced community members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-sm">Health Mentors</p>
                    <p className="text-xs text-muted-foreground">Get guidance on health management</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-sm">Workplace Wellness</p>
                    <p className="text-xs text-muted-foreground">Tips for staying healthy at work</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Find a Mentor</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shared Knowledge Base</CardTitle>
                <CardDescription>Community-contributed health resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <p className="font-medium text-sm">Home Remedies Guide</p>
                  <p className="text-xs text-muted-foreground">Traditional remedies from various cultures</p>
                </div>
                <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <p className="font-medium text-sm">Emergency Contact List</p>
                  <p className="text-xs text-muted-foreground">Important numbers by location</p>
                </div>
                <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <p className="font-medium text-sm">Clinic Reviews</p>
                  <p className="text-xs text-muted-foreground">Community-rated healthcare providers</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
                <CardDescription>Inspiring health journey stories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <p className="font-medium text-sm">Diabetes Management Success</p>
                  <p className="text-xs text-muted-foreground">How I controlled my blood sugar</p>
                </div>
                <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <p className="font-medium text-sm">Mental Health Recovery</p>
                  <p className="text-xs text-muted-foreground">Finding support in community</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};