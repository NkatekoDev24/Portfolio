import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, User, Bot, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const DemoAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Nkateko Nkuna. I'm excited to have this conversation with you! Choose your role and ask me anything - whether it's about my technical skills, projects, or experience. I'm here to help you get to know me better.",
      timestamp: new Date(),
    },
  ]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    "Technical Interviewer",
    "HR Recruiter", 
    "Client",
    "General Q&A"
  ];

  const handleSendMessage = async () => {
    if (!selectedRole.trim() || !question.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a role and enter your question.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/demo-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: selectedRole,
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="demo-agent" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Demo Agent
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience a live portfolio demo! Choose your role and interview Nkateko as if you were a real recruiter or client.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Interview Nkateko</CardTitle>
                  <CardDescription>
                    Select your role and start the conversation
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Role Selection */}
              <div className="p-6 border-b bg-muted/20">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">
                      Your Role
                    </label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your role..." />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">
                      Your Question
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask Nkateko anything..."
                        disabled={isLoading}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={isLoading || !selectedRole || !question.trim()}
                        size="icon"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96">
                <ScrollArea className="h-full p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium opacity-70">
                              {message.role === "user" ? "You" : "Nkateko"}
                            </span>
                            {message.role === "user" && selectedRole && (
                              <Badge variant="secondary" className="text-xs">
                                {selectedRole}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                          <p className="text-xs opacity-50 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>

                        {message.role === "user" && (
                          <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div className="bg-muted rounded-2xl px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Nkateko is typing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Card className="bg-muted/20 border-0">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">💼 Technical Interviewer</h4>
                <p className="text-sm text-muted-foreground">
                  Ask about coding challenges, architecture decisions, and technical problem-solving approaches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20 border-0">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">👥 HR Recruiter</h4>
                <p className="text-sm text-muted-foreground">
                  Explore soft skills, teamwork experiences, career goals, and cultural fit questions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20 border-0">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">🤝 Client</h4>
                <p className="text-sm text-muted-foreground">
                  Discuss project management, communication skills, and how to handle client requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoAgent;
