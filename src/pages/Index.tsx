import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface User {
  id: number;
  name: string;
  age: number;
  bio: string;
  photo: string;
  interests: string[];
  distance: number;
}

interface Match {
  id: number;
  user: User;
  matchedAt: Date;
  lastMessage?: string;
  unread?: number;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

const demoUsers: User[] = [
  {
    id: 1,
    name: 'Анна',
    age: 25,
    bio: 'Люблю путешествия, йогу и хорошую музыку. Ищу интересного собеседника для прогулок и совместных приключений 🌸',
    photo: 'https://cdn.poehali.dev/projects/b7450932-9e93-42af-8070-a37144bb34da/files/2e777a97-ace8-4096-b177-ac7856f46dd9.jpg',
    interests: ['Йога', 'Путешествия', 'Музыка', 'Фотография'],
    distance: 2
  },
  {
    id: 2,
    name: 'Дмитрий',
    age: 28,
    bio: 'Программист и любитель активного отдыха. В свободное время играю на гитаре и изучаю новые технологии 🎸',
    photo: 'https://cdn.poehali.dev/projects/b7450932-9e93-42af-8070-a37144bb34da/files/463c9ea6-9a29-4a61-ba12-36db4ae4a80b.jpg',
    interests: ['IT', 'Гитара', 'Спорт', 'Кино'],
    distance: 5
  },
  {
    id: 3,
    name: 'Елена',
    age: 27,
    bio: 'Дизайнер, ценю искусство и красоту во всём. Обожаю кофейни, выставки и неспешные разговоры о важном ☕️',
    photo: 'https://cdn.poehali.dev/projects/b7450932-9e93-42af-8070-a37144bb34da/files/9ef726a6-b0ac-4919-9e91-e9fac0bbce30.jpg',
    interests: ['Дизайн', 'Искусство', 'Кофе', 'Психология'],
    distance: 3
  }
];

const Index = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', sender: 'other', time: '14:30' },
    { id: 2, text: 'Привет! Отлично, спасибо! А у тебя?', sender: 'me', time: '14:32' },
    { id: 3, text: 'Тоже хорошо! Хочешь созвониться в видео?', sender: 'other', time: '14:35' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [dislikeAnimation, setDislikeAnimation] = useState(false);

  const currentUser = demoUsers[currentUserIndex];

  const handleLike = () => {
    setLikeAnimation(true);
    setTimeout(() => {
      const newMatch: Match = {
        id: matches.length + 1,
        user: currentUser,
        matchedAt: new Date(),
        lastMessage: 'Вы понравились друг другу! 💕'
      };
      setMatches([newMatch, ...matches]);
      nextUser();
      setLikeAnimation(false);
    }, 500);
  };

  const handleDislike = () => {
    setDislikeAnimation(true);
    setTimeout(() => {
      nextUser();
      setDislikeAnimation(false);
    }, 300);
  };

  const nextUser = () => {
    if (currentUserIndex < demoUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      setCurrentUserIndex(0);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const msg: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, msg]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-peach-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
            <Icon name="Heart" className="text-primary" size={36} />
            LoveConnect
          </h1>
          <p className="text-muted-foreground">Найди свою вторую половинку</p>
        </div>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="discover" className="flex items-center gap-2">
              <Icon name="Sparkles" size={18} />
              <span className="hidden sm:inline">Знакомства</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex items-center gap-2">
              <Icon name="Users" size={18} />
              <span className="hidden sm:inline">Симпатии</span>
              {matches.length > 0 && (
                <Badge variant="destructive" className="ml-1">{matches.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Icon name="MessageCircle" size={18} />
              <span className="hidden sm:inline">Чат</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Icon name="Video" size={18} />
              <span className="hidden sm:inline">Видео</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="animate-scale-in">
            {currentUser && (
              <div className="max-w-md mx-auto">
                <Card className="overflow-hidden shadow-2xl border-0 relative">
                  {likeAnimation && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-primary/20 animate-fade-in">
                      <Icon name="Heart" className="text-primary animate-heart-beat" size={120} />
                    </div>
                  )}
                  {dislikeAnimation && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-destructive/20 animate-fade-in">
                      <Icon name="X" className="text-destructive" size={120} />
                    </div>
                  )}
                  
                  <div className="relative h-96">
                    <img 
                      src={currentUser.photo} 
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                      <h2 className="text-3xl font-bold mb-1">
                        {currentUser.name}, {currentUser.age}
                      </h2>
                      <p className="flex items-center gap-1 text-sm opacity-90">
                        <Icon name="MapPin" size={16} />
                        {currentUser.distance} км от вас
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-foreground mb-4 leading-relaxed">{currentUser.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentUser.interests.map((interest, idx) => (
                        <Badge key={idx} variant="secondary" className="text-sm">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4 justify-center">
                      <Button 
                        size="lg"
                        variant="outline"
                        className="rounded-full w-16 h-16 border-2 hover:scale-110 transition-transform"
                        onClick={handleDislike}
                      >
                        <Icon name="X" className="text-muted-foreground" size={32} />
                      </Button>
                      <Button 
                        size="lg"
                        className="rounded-full w-20 h-20 bg-primary hover:bg-primary/90 hover:scale-110 transition-transform shadow-lg"
                        onClick={handleLike}
                      >
                        <Icon name="Heart" size={36} />
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline"
                        className="rounded-full w-16 h-16 border-2 hover:scale-110 transition-transform"
                      >
                        <Icon name="Star" className="text-yellow-500" size={32} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches" className="animate-scale-in">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Heart" className="text-primary" />
                Взаимные симпатии
              </h2>
              {matches.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="HeartCrack" size={64} className="mx-auto mb-4 opacity-50" />
                  <p>Пока нет взаимных симпатий</p>
                  <p className="text-sm mt-2">Ставьте лайки, чтобы найти пару!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matches.map((match) => (
                    <Card 
                      key={match.id} 
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedMatch(match)}
                    >
                      <div className="relative h-48">
                        <img 
                          src={match.user.photo} 
                          alt={match.user.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-primary">
                          Новое
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">
                          {match.user.name}, {match.user.age}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {match.lastMessage}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="animate-scale-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  Диалоги
                </h3>
                <ScrollArea className="h-96">
                  {matches.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Нет активных диалогов
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {matches.map((match) => (
                        <div 
                          key={match.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => setSelectedMatch(match)}
                        >
                          <Avatar>
                            <AvatarImage src={match.user.photo} />
                            <AvatarFallback>{match.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{match.user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {match.lastMessage}
                            </p>
                          </div>
                          {match.unread && (
                            <Badge variant="destructive" className="text-xs">
                              {match.unread}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </Card>

              <Card className="lg:col-span-2 flex flex-col">
                {selectedMatch ? (
                  <>
                    <div className="p-4 border-b flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedMatch.user.photo} />
                        <AvatarFallback>{selectedMatch.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{selectedMatch.user.name}</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          Онлайн
                        </p>
                      </div>
                    </div>
                    
                    <ScrollArea className="flex-1 p-4 h-80">
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div 
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-xs px-4 py-2 rounded-2xl ${
                                msg.sender === 'me' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-secondary text-secondary-foreground'
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="p-4 border-t flex gap-2">
                      <Input 
                        placeholder="Напишите сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <Button onClick={sendMessage}>
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-50" />
                      <p>Выберите диалог</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="video" className="animate-scale-in">
            <Card className="p-8">
              <div className="text-center max-w-2xl mx-auto">
                <div className="mb-6">
                  <Icon name="Video" size={80} className="mx-auto text-primary mb-4" />
                  <h2 className="text-3xl font-bold mb-3">Видео-общение</h2>
                  <p className="text-muted-foreground mb-6">
                    Начните видео-звонок с вашей симпатией или отправьте видео-сообщение
                  </p>
                </div>

                {matches.length === 0 ? (
                  <div className="bg-secondary/50 rounded-xl p-8">
                    <Icon name="UserX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Чтобы начать видео-общение, сначала найдите взаимную симпатию
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-secondary/50 rounded-xl p-6">
                      <h3 className="font-semibold mb-4">Доступно для видео-звонков:</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {matches.map((match) => (
                          <div key={match.id} className="text-center">
                            <Avatar className="w-20 h-20 mx-auto mb-2 border-4 border-primary">
                              <AvatarImage src={match.user.photo} />
                              <AvatarFallback>{match.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <p className="font-medium text-sm mb-2">{match.user.name}</p>
                            <Button size="sm" className="w-full">
                              <Icon name="Video" size={16} className="mr-1" />
                              Позвонить
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button size="lg" variant="outline" className="h-auto py-6">
                        <div className="text-center">
                          <Icon name="Video" size={32} className="mx-auto mb-2" />
                          <p className="font-semibold">Видео-звонок</p>
                          <p className="text-xs text-muted-foreground">Общайтесь лицом к лицу</p>
                        </div>
                      </Button>
                      <Button size="lg" variant="outline" className="h-auto py-6">
                        <div className="text-center">
                          <Icon name="Clapperboard" size={32} className="mx-auto mb-2" />
                          <p className="font-semibold">Видео-сообщение</p>
                          <p className="text-xs text-muted-foreground">Запишите короткое видео</p>
                        </div>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
