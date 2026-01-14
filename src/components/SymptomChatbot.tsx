import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Pill, AlertTriangle, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessage: Message = {
  id: "1",
  role: "assistant",
  content: `Hello! I'm your AI Health Assistant. 👋

I can help you understand your symptoms and provide general health guidance, including:

• **Symptom Analysis** - Describe what you're feeling
• **Possible Conditions** - Based on common patterns
• **Medicine Suggestions** - Over-the-counter options
• **When to See a Doctor** - Important red flags

⚠️ **Important:** This is not a substitute for professional medical advice. Always consult a healthcare provider for proper diagnosis and treatment.

**How can I help you today?** You can start by telling me about your symptoms.`,
  timestamp: new Date(),
};

// Symptom analysis logic
const analyzeSymptoms = (input: string): string => {
  const lowerInput = input.toLowerCase();

  // Headache symptoms
  if (lowerInput.includes("headache") || lowerInput.includes("head pain") || lowerInput.includes("migraine")) {
    return `Based on your description of **headache symptoms**, here's my analysis:

### 🔍 Possible Causes:
- **Tension headache** - Most common, caused by stress or muscle tension
- **Migraine** - Often with nausea, light sensitivity
- **Dehydration** - Lack of fluids can trigger headaches
- **Eye strain** - From screens or reading

### 💊 Suggested Over-the-Counter Medicines:
1. **Paracetamol (Crocin/Dolo)** - 500-1000mg every 4-6 hours
2. **Ibuprofen (Brufen)** - 200-400mg with food
3. **Disprin** - 500mg (not for children under 16)

### 🏠 Home Remedies:
- Rest in a dark, quiet room
- Apply cold compress to forehead
- Stay hydrated (8 glasses of water)
- Avoid screen time

### 🚨 See a Doctor If:
- Severe, sudden headache ("thunderclap")
- Fever, stiff neck, or confusion
- Headache after injury
- Symptoms persist beyond 3 days

Would you like me to help you find a doctor for consultation?`;
  }

  // Fever symptoms
  if (lowerInput.includes("fever") || lowerInput.includes("temperature") || lowerInput.includes("chills")) {
    return `Based on your **fever symptoms**, here's my analysis:

### 🔍 Possible Causes:
- **Viral infection** - Cold, flu, COVID-19
- **Bacterial infection** - May need antibiotics
- **Inflammatory conditions**

### 💊 Suggested Over-the-Counter Medicines:
1. **Paracetamol (Crocin/Dolo)** - 500-1000mg every 4-6 hours
2. **Ibuprofen (Combiflam)** - Helps reduce fever and inflammation

### 🏠 Home Care:
- Rest and sleep
- Drink plenty of fluids (ORS, nimbu pani)
- Light, loose clothing
- Lukewarm sponge bath

### 🚨 See a Doctor Immediately If:
- Temperature above 103°F (39.4°C)
- Fever lasting more than 3 days
- Severe headache, rash, or stiff neck
- Difficulty breathing
- Confusion or unusual behavior

Shall I help you book an appointment with a General Physician?`;
  }

  // Cough/Cold symptoms
  if (lowerInput.includes("cough") || lowerInput.includes("cold") || lowerInput.includes("sore throat") || lowerInput.includes("runny nose")) {
    return `Based on your **cold/cough symptoms**, here's my analysis:

### 🔍 Possible Causes:
- **Common cold** - Viral, self-limiting
- **Flu (Influenza)** - More severe symptoms
- **Allergies** - Seasonal or environmental
- **Throat infection** - Bacterial or viral

### 💊 Suggested Medicines:
1. **For dry cough:** Benadryl DR, Honitus
2. **For wet cough:** Ascoril, Mucinex
3. **Sore throat:** Strepsils lozenges, warm salt water gargle
4. **Congestion:** Otrivin nasal drops, steam inhalation
5. **Runny nose:** Cetirizine (Cetzine), Allegra

### 🏠 Home Remedies:
- Honey with warm water or kadha
- Steam inhalation with Vicks
- Rest and hydration
- Haldi doodh (turmeric milk)

### 🚨 See a Doctor If:
- Cough lasts more than 2 weeks
- Blood in mucus
- High fever with chills
- Difficulty breathing or chest pain

Would you like to consult an ENT specialist?`;
  }

  // Stomach/digestive issues
  if (lowerInput.includes("stomach") || lowerInput.includes("nausea") || lowerInput.includes("vomit") || lowerInput.includes("diarrhea") || lowerInput.includes("digestion") || lowerInput.includes("acidity")) {
    return `Based on your **digestive symptoms**, here's my analysis:

### 🔍 Possible Causes:
- **Food poisoning** - Contaminated food/water
- **Gastritis** - Stomach inflammation
- **Viral gastroenteritis** - Stomach flu
- **Indigestion** - Overeating or spicy food

### 💊 Suggested Medicines:
1. **Nausea/Vomiting:** Ondem (Ondansetron), Domstal
2. **Acidity:** Digene, Pan-D, Rantac
3. **Diarrhea:** Loperamide (Eldoper), Norflox-TZ
4. **Cramps:** Cyclopam, Meftal Spas

### 🏠 Home Care:
- Clear fluids (ORS, coconut water, nimbu pani)
- BRAT diet (Banana, Rice, Apple, Toast)
- Avoid dairy and fatty foods
- Jeera water, ajwain water

### 🚨 Seek Immediate Care If:
- Blood in stool or vomit
- Severe abdominal pain
- Signs of dehydration
- Symptoms lasting more than 48 hours

Should I find a Gastroenterologist near you?`;
  }

  // Body pain/muscle aches
  if (lowerInput.includes("body pain") || lowerInput.includes("muscle") || lowerInput.includes("joint") || lowerInput.includes("back pain")) {
    return `Based on your **pain symptoms**, here's my analysis:

### 🔍 Possible Causes:
- **Muscle strain** - Overexertion or injury
- **Viral infection** - Body aches common with flu
- **Poor posture** - Especially for back pain
- **Arthritis** - Joint inflammation

### 💊 Suggested Medicines:
1. **Pain relief:** Combiflam, Brufen, Volini gel
2. **Muscle relaxant:** Myospaz, Thiocolchicoside
3. **For inflammation:** Voveran, Zerodol-P

### 🏠 Self-Care:
- Rest the affected area
- Ice pack for 20 mins (first 48 hours)
- Warm compress after 48 hours
- Gentle stretching and yoga

### 🚨 See a Doctor If:
- Pain after injury or fall
- Numbness or tingling
- Swelling or redness
- Pain that worsens or doesn't improve

Want me to connect you with an Orthopedic specialist?`;
  }

  // Skin issues
  if (lowerInput.includes("skin") || lowerInput.includes("rash") || lowerInput.includes("itch") || lowerInput.includes("acne") || lowerInput.includes("pimple")) {
    return `Based on your **skin symptoms**, here's my analysis:

### 🔍 Possible Causes:
- **Allergic reaction** - Contact or food allergy
- **Eczema** - Dry, itchy patches
- **Fungal infection** - Ringworm, athlete's foot
- **Acne** - Hormonal or bacterial

### 💊 Suggested Medicines:
1. **Itching:** Cetirizine, Allegra, Calamine lotion
2. **Mild rash:** Betnovate-C, Fourderm cream
3. **Fungal:** Candid cream, Ring Guard
4. **Acne:** Benzoyl peroxide gel, Clindamycin gel

### 🏠 Skin Care Tips:
- Keep affected area clean and dry
- Avoid scratching
- Use mild, fragrance-free products
- Wear loose, cotton clothing

### 🚨 See a Dermatologist If:
- Spreading rapidly
- Blistering or oozing
- Fever with rash
- Doesn't improve in a week

Shall I help you find a Dermatologist?`;
  }

  // Default response
  return `Thank you for sharing your symptoms. To provide better guidance, could you please tell me more about:

1. **Main symptom** - What's bothering you most?
2. **Duration** - How long have you had these symptoms?
3. **Severity** - On a scale of 1-10?
4. **Other symptoms** - Any accompanying issues?

Common symptoms I can help with:
- 🤕 Headaches & Migraines
- 🤒 Fever & Chills
- 🤧 Cold, Cough & Sore Throat
- 🤢 Stomach Issues & Nausea
- 💪 Body Pain & Muscle Aches
- 🩹 Skin Problems & Rashes

Please describe your symptoms in detail, and I'll provide personalized recommendations.`;
};

const SymptomChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = analyzeSymptoms(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] gradient-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl gradient-primary">
            <Stethoscope className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Health Assistant</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-healthcare-green animate-pulse" />
              Online • Ready to help
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-slide-up",
                message.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  message.role === "user"
                    ? "bg-primary"
                    : "bg-healthcare-teal-light"
                )}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-primary" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl p-4",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-secondary text-secondary-foreground rounded-tl-sm"
                )}
              >
                <div
                  className="text-sm leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/### (.*?)$/gm, '<h4 class="text-sm font-bold mt-3 mb-2">$1</h4>')
                      .replace(/- (.*?)$/gm, '<li class="ml-4">$1</li>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-healthcare-teal-light flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-tl-sm p-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-healthcare-orange-light border-t border-healthcare-orange/20">
        <p className="text-xs text-healthcare-orange flex items-center gap-2">
          <AlertTriangle className="w-3 h-3 shrink-0" />
          Medical advice is for informational purposes only. Consult a healthcare provider.
        </p>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            type="submit"
            variant="hero"
            size="icon"
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SymptomChatbot;
