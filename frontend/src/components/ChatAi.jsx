// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../utils/axiosClient";
// import { Send } from 'lucide-react';

// function ChatAi({problem}) {
//     const [messages, setMessages] = useState([
//         { role: 'model', parts:[{text: "Hi, How are you"}]},
//         { role: 'user', parts:[{text: "I am Good"}]}
//     ]);

//     const { register, handleSubmit, reset,formState: {errors} } = useForm();
//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const onSubmit = async (data) => {
        
//         setMessages(prev => [...prev, { role: 'user', parts:[{text: data.message}] }]);
//         reset();

//         try {
            
//             const response = await axiosClient.post("/ai/chat", {
//                 messages:messages,
//                 title:problem.title,
//                 description:problem.description,
//                 testCases: problem.visibleTestCases,
//                 startCode:problem.startCode
//             });

           
//             setMessages(prev => [...prev, { 
//                 role: 'model', 
//                 parts:[{text: response.data.message}] 
//             }]);
//         } catch (error) {
//             console.error("API Error:", error);
//             setMessages(prev => [...prev, { 
//                 role: 'model', 
//                 parts:[{text: "Error from AI Chatbot"}]
//             }]);
//         }
//     };

//     return (
//         <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {messages.map((msg, index) => (
//                     <div 
//                         key={index} 
//                         className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
//                     >
//                         <div className="chat-bubble bg-base-200 text-base-content">
//                             {msg.parts[0].text}
//                         </div>
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <form 
//                 onSubmit={handleSubmit(onSubmit)} 
//                 className="sticky bottom-0 p-4 bg-base-100 border-t"
//             >
//                 <div className="flex items-center">
//                     <input 
//                         placeholder="Ask me anything" 
//                         className="input input-bordered flex-1" 
//                         {...register("message", { required: true, minLength: 2 })}
//                     />
//                     <button 
//                         type="submit" 
//                         className="btn btn-ghost ml-2"
//                         disabled={errors.message}
//                     >
//                         <Send size={20} />
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default ChatAi;

// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../utils/axiosClient";
// import { Send } from "lucide-react";

// function ChatAi({ problem }) {
//   const [messages, setMessages] = useState([
//     { role: "assistant", content: "Hi, how are you?" },
//     { role: "user", content: "I am good" },
//   ]);

//   const [loading, setLoading] = useState(false);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const onSubmit = async (data) => {
//     const userMessage = data.message.trim();
//     if (!userMessage) return;

//     const updatedMessages = [
//       ...messages,
//       { role: "user", content: userMessage },
//     ];

//     // update UI immediately
//     setMessages(updatedMessages);
//     reset();
//     setLoading(true);

//     try {
//       const response = await axiosClient.post("/ai/chat", {
//         messages: updatedMessages, // ✅ correct updated messages
//         title: problem.title,
//         description: problem.description,
//         testCases: problem.visibleTestCases,
//         startCode: problem.startCode,
//       });

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: response.data.message,
//         },
//       ]);

//     } catch (error) {
//       console.error("API Error:", error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "⚠️ Error from AI Chatbot",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
      
//       {/* CHAT AREA */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
//           >
//             <div className="chat-bubble bg-base-200 text-base-content">
//               {msg.content}
//             </div>
//           </div>
//         ))}

//         {loading && (
//           <div className="chat chat-start">
//             <div className="chat-bubble">Typing...</div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* INPUT */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="sticky bottom-0 p-4 bg-base-100 border-t"
//       >
//         <div className="flex items-center">
//           <input
//             placeholder="Ask me anything"
//             className="input input-bordered flex-1"
//             {...register("message", { required: true, minLength: 2 })}
//           />

//           <button
//             type="submit"
//             className="btn btn-ghost ml-2"
//             disabled={errors.message || loading}
//           >
//             <Send size={20} />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ChatAi;