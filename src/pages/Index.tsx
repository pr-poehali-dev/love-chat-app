import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Character {
  id: number;
  name: string;
  personality: string;
  description: string;
  avatar: string;
  greeting: string;
  tags: string[];
  messageCount: number;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'character';
  timestamp: Date;
  image?: string;
}

const characters: Character[] = [
  {
    id: 1,
    name: 'Сакура',
    personality: 'Милая и застенчивая',
    description: 'Добрая девушка-студентка, которая любит помогать другим. Немного застенчивая, но очень искренняя в общении.',
    avatar: 'https://cdn.poehali.dev/projects/b7450932-9e93-42af-8070-a37144bb34da/files/99aa87c8-706f-4b6b-bb87-a0c51e3855ee.jpg',
    greeting: 'П-привет! Я Сакура... Очень рада познакомиться! 💕',
    tags: ['Милая', 'Студентка', 'Добрая', 'SFW'],
    messageCount: 1523
  },
  {
    id: 2,
    name: 'Рюджи',
    personality: 'Уверенный и харизматичный',
    description: 'Популярный парень с крутым характером. Любит спорт и музыку. Всегда знает, что сказать.',
    avatar: 'https://cdn.poehali.dev/projects/b7450932-9e93-42af-8070-a37144bb34da/files/37c14ef2-ecbc-444b-9d6b-37e5a94f9da4.jpg',
    greeting: 'Йо! Что нового? Давай потусим в чате!',
    tags: ['Крутой', 'Спортивный', 'Популярный', 'SFW'],
    messageCount: 2841
  },
  {
    id: 3,
    name: 'Юки',
    personality: 'Загадочная и умная',
    description: 'Таинственная красавица с острым умом. Любит философские беседы и искусство.',
    avatar: 'https://cdn.poehali.dev/projects/b7450932-9e93-42af-8070-a37144bb34da/files/153d7855-110c-43ed-967b-d4f4ef9e24a3.jpg',
    greeting: 'Приветствую... Интересно, о чём мы сегодня поговорим?',
    tags: ['Загадочная', 'Умная', 'Элегантная', 'SFW'],
    messageCount: 1876
  }
];

const Index = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showImageGen, setShowImageGen] = useState(false);

  const startChat = (character: Character) => {
    setSelectedCharacter(character);
    setMessages([
      {
        id: 1,
        text: character.greeting,
        sender: 'character',
        timestamp: new Date()
      }
    ]);
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !selectedCharacter) return;

    const userMsg: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMsg]);

    setTimeout(() => {
      const responses = {
        1: [
          'Ох, это так интересно! Расскажи ещё! 😊',
          'Я никогда не думала об этом так... Спасибо за мысль!',
          'Ты такой интересный собеседник! Мне нравится с тобой общаться 💖',
          'Эх, я тоже так думаю! У нас похожие взгляды!'
        ],
        2: [
          'Ха, круто! Мне нравится твой стиль 😎',
          'Окей, звучит неплохо! А что думаешь насчёт...?',
          'Респект! Ты знаешь толк в этом деле 🔥',
          'Йоу, отличная идея! Давай развивать эту тему!'
        ],
        3: [
          'Любопытная точка зрения... Позволь мне подумать.',
          'М-м-м... Это открывает интересные перспективы для размышлений.',
          'Ты задаёшь правильные вопросы. Мне это нравится.',
          'Философски... Я ценю глубину твоих мыслей.'
        ]
      };

      const characterResponses = responses[selectedCharacter.id as keyof typeof responses] || responses[1];
      const randomResponse = characterResponses[Math.floor(Math.random() * characterResponses.length)];

      const botMsg: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'character',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    }, 1000 + Math.random() * 1000);

    setInputMessage('');
  };

  const generateImage = () => {
    if (!imagePrompt.trim() || !selectedCharacter) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const genMsg: Message = {
        id: messages.length + 1,
        text: `Я сгенерировала изображение для тебя! 🎨`,
        sender: 'character',
        timestamp: new Date(),
        image: selectedCharacter.avatar
      };
      
      setMessages([...messages, genMsg]);
      setIsGenerating(false);
      setImagePrompt('');
      setShowImageGen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-2">
            ✨ AnimeChat AI ✨
          </h1>
          <p className="text-muted-foreground text-lg">Общайся с умными аниме-персонажами бесплатно!</p>
          <Badge variant="secondary" className="mt-2">
            🎨 Генерация изображений • 💬 Умный AI чат • 🆓 100% Бесплатно
          </Badge>
        </div>

        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md mx-auto">
            <TabsTrigger value="characters" className="flex items-center gap-2">
              <Icon name="Users" size={18} />
              Персонажи
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2" disabled={!selectedCharacter}>
              <Icon name="MessageCircle" size={18} />
              Чат
            </TabsTrigger>
          </TabsList>

          <TabsContent value="characters" className="animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((char) => (
                <Card 
                  key={char.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2"
                  onClick={() => startChat(char)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={char.avatar} 
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{char.name}</h3>
                      <p className="text-sm opacity-90">{char.personality}</p>
                    </div>
                    <Badge className="absolute top-3 right-3 bg-primary">
                      💬 {char.messageCount.toLocaleString()}
                    </Badge>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {char.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {char.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        startChat(char);
                      }}
                    >
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      Начать общение
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-8 p-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <div className="text-center max-w-2xl mx-auto">
                <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-purple-600" />
                <h2 className="text-2xl font-bold mb-3">Бесплатная генерация изображений!</h2>
                <p className="text-muted-foreground mb-4">
                  Попроси любого персонажа сгенерировать для тебя аниме-арт по описанию. 
                  Все функции полностью бесплатны!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/50 rounded-lg p-4">
                    <Icon name="MessageCircle" size={24} className="mx-auto mb-2 text-purple-600" />
                    <p className="font-semibold">Умный AI</p>
                    <p className="text-xs text-muted-foreground">Реалистичное общение</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <Icon name="Image" size={24} className="mx-auto mb-2 text-pink-600" />
                    <p className="font-semibold">Генерация артов</p>
                    <p className="text-xs text-muted-foreground">Любые изображения</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <Icon name="Zap" size={24} className="mx-auto mb-2 text-blue-600" />
                    <p className="font-semibold">100% Бесплатно</p>
                    <p className="text-xs text-muted-foreground">Без ограничений</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="animate-scale-in">
            {selectedCharacter && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1 p-5">
                  <div className="text-center mb-5">
                    <Avatar className="w-24 h-24 mx-auto mb-3 border-4 border-primary">
                      <AvatarImage src={selectedCharacter.avatar} />
                      <AvatarFallback>{selectedCharacter.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-xl mb-1">{selectedCharacter.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{selectedCharacter.personality}</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      Онлайн
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                      <p className="font-semibold mb-1 flex items-center gap-2">
                        <Icon name="User" size={16} />
                        О персонаже
                      </p>
                      <p className="text-xs text-muted-foreground">{selectedCharacter.description}</p>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-3 text-sm">
                      <p className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Tags" size={16} />
                        Теги
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedCharacter.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCharacter(null);
                        setMessages([]);
                      }}
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Выбрать другого
                    </Button>
                  </div>
                </Card>

                <Card className="lg:col-span-3 flex flex-col h-[600px]">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedCharacter.avatar} />
                        <AvatarFallback>{selectedCharacter.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{selectedCharacter.name}</p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          Печатает...
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowImageGen(!showImageGen)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Icon name="Image" size={16} className="mr-2" />
                      Генерация
                    </Button>
                  </div>

                  {showImageGen && (
                    <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50 animate-slide-up">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Sparkles" size={16} />
                        Генерация изображения (Бесплатно!)
                      </p>
                      <div className="flex gap-2">
                        <Textarea 
                          placeholder="Опиши, какое изображение ты хочешь получить..."
                          value={imagePrompt}
                          onChange={(e) => setImagePrompt(e.target.value)}
                          className="min-h-[60px]"
                        />
                        <Button 
                          onClick={generateImage}
                          disabled={isGenerating || !imagePrompt.trim()}
                          className="bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          {isGenerating ? (
                            <>
                              <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                              Генерация...
                            </>
                          ) : (
                            <>
                              <Icon name="Wand2" size={18} className="mr-2" />
                              Создать
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                        >
                          <div 
                            className={`max-w-[70%] ${
                              msg.sender === 'user' 
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                                : 'bg-secondary text-secondary-foreground'
                            } px-4 py-3 rounded-2xl shadow-md`}
                          >
                            {msg.image && (
                              <img 
                                src={msg.image} 
                                alt="Generated" 
                                className="rounded-lg mb-2 max-w-full h-auto"
                              />
                            )}
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t bg-muted/30">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Напиши сообщение..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button 
                        onClick={sendMessage}
                        disabled={!inputMessage.trim()}
                        className="bg-gradient-to-r from-purple-600 to-pink-600"
                      >
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      💡 Попроси персонажа сгенерировать изображение через кнопку "Генерация"
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
