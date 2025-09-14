import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Gift, Target, Zap, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Gamification = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(3);
  const [achievements, setAchievements] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Mock achievements data
    setAchievements([
      {
        id: 1,
        title: "Health Tracker Hero",
        description: "Log health data for 7 consecutive days",
        points: 100,
        completed: true,
        icon: <Target className="h-5 w-5" />,
        date: "2024-01-15"
      },
      {
        id: 2,
        title: "Medication Master",
        description: "100% medication adherence for a month",
        points: 200,
        completed: true,
        icon: <Award className="h-5 w-5" />,
        date: "2024-01-10"
      },
      {
        id: 3,
        title: "Community Helper",
        description: "Help 5 fellow users in the community forum",
        points: 150,
        completed: false,
        progress: 60,
        icon: <Star className="h-5 w-5" />
      }
    ]);
  }, []);

  const challenges = [
    {
      title: "Weekly Health Check",
      description: "Complete your weekly vital signs tracking",
      points: 50,
      timeLeft: "3 days",
      progress: 70,
      type: "weekly"
    },
    {
      title: "Hydration Hero",
      description: "Log 8 glasses of water daily for a week",
      points: 75,
      timeLeft: "5 days",
      progress: 40,
      type: "daily"
    },
    {
      title: "Knowledge Quest",
      description: "Complete 3 health education quizzes",
      points: 100,
      timeLeft: "1 week",
      progress: 33,
      type: "learning"
    }
  ];

  const rewards = [
    {
      name: "Free Data Pack (1GB)",
      points: 500,
      available: true,
      type: "data"
    },
    {
      name: "Medicine Discount (10%)",
      points: 750,
      available: true,
      type: "discount"
    },
    {
      name: "Telemedicine Consultation",
      points: 1000,
      available: true,
      type: "health"
    },
    {
      name: "Premium Health Report",
      points: 1500,
      available: false,
      type: "premium"
    }
  ];

  const redeemReward = (reward: any) => {
    if (userPoints >= reward.points && reward.available) {
      setUserPoints(prev => prev - reward.points);
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.name}`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - userPoints} more points to redeem this reward`,
        variant: "destructive"
      });
    }
  };

  const levelProgress = ((userPoints % 500) / 500) * 100;
  const nextLevelPoints = Math.ceil(userPoints / 500) * 500;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Trophy className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Health Rewards</h1>
          <p className="text-muted-foreground">Earn points and unlock rewards for staying healthy</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-2xl font-bold text-primary">{userPoints}</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Level</p>
                <p className="text-2xl font-bold text-secondary">{userLevel}</p>
              </div>
              <Star className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Level</span>
                <span>{nextLevelPoints - userPoints} points</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle>Active Challenges</CardTitle>
          <CardDescription>Complete these challenges to earn points and rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map((challenge, index) => (
            <div key={index} className="p-4 rounded-lg border space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">+{challenge.points} pts</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{challenge.timeLeft} left</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your health journey milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${achievement.completed ? 'bg-primary/5 border-primary/20' : 'bg-muted/50'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${achievement.completed ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      {achievement.completed && <Badge variant="default">Completed</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-primary">+{achievement.points} points</span>
                      {achievement.completed && (
                        <span className="text-xs text-muted-foreground">{achievement.date}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Store */}
      <Card>
        <CardHeader>
          <CardTitle>Rewards Store</CardTitle>
          <CardDescription>Redeem your points for valuable rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward, index) => (
              <div key={index} className="p-4 rounded-lg border space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{reward.name}</h3>
                    <p className="text-sm text-primary font-medium">{reward.points} points</p>
                  </div>
                  <Gift className="h-5 w-5 text-muted-foreground" />
                </div>
                <Button
                  variant={reward.available && userPoints >= reward.points ? "default" : "outline"}
                  className="w-full"
                  disabled={!reward.available || userPoints < reward.points}
                  onClick={() => redeemReward(reward)}
                >
                  {userPoints >= reward.points ? "Redeem" : `Need ${reward.points - userPoints} more points`}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};