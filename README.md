# 💬 NextChat - Chat App Frontend

A **real-time chat web application** built using **React**, **Tailwind CSS**, and **Socket.IO Client**, seamlessly integrated with the [NextChat Backend](https://github.com/THIS4LA/NextChat-ChatApp-BackEnd).  
This frontend provides a modern and responsive user experience with live conversations, authentication, and dynamic user presence.

🌐 **Live Website:** [https://nextchat-chatapp-frontend-v1.onrender.com](https://nextchat-chatapp-frontend-v1.onrender.com)  
⚠️ **Note:** The website is hosted on **Render’s free tier**, so the **first request may take up to 1 minute** to load as the server spins up.

---

## 🧠 Overview

NextChat Frontend connects to the NextChat Backend via REST APIs and Socket.IO for real-time communication.  
Users can register, log in, start conversations, send messages instantly, and see when others are typing or online.

---

## 🚀 Features

- 🔐 **User Authentication** (Register & Login via backend API)
- 💬 **Real-Time Messaging** powered by Socket.IO
- ✍️ **Typing Indicators**
- 🟢 **Online User Tracking**
- 📱 **Responsive UI** built with Tailwind CSS
- 🌙 **Modern Design** with smooth state management (React Hooks)
- ⚙️ **Environment-based API configuration**

---

## ⚙️ Environment Variables

Create a `.env` file in your project root with:

```env
NEXT_PUBLIC_API_URL = <your_backend_url>
NEXT_PUBLIC_CLOUD_NAME = <your_cloudinary_cloud_name>
NEXT_PUBLIC_UPLOAD_PRESET = <your_cloudinary_upload_preset_name>
```

---

## 🧩 Tech Stack

| Layer                   | Technology                                                              |
| ----------------------- | ----------------------------------------------------------------------- |
| Frontend Framework      | Next.js                                                                 |
| Styling                 | Tailwind CSS                                                            |
| Real-time Communication | Socket.IO Client                                                        |
| State Management        | React Hooks / Redux Persist                                             |
| Deployment              | Render (Free Tier)                                                      |
| Backend API             | [NextChat Backend](https://github.com/THIS4LA/NextChat-ChatApp-BackEnd) |

---

## 🧠 Known Limitations

- ⏱ Cold start delay (Render free tier may take ~1 minute to spin up)
- 🧍‍♂️ Contact adding Not implemented yet — you can search users by name on the home page and start chatting directly.

---

## 👨‍💻 Author

- Developed by  : [THIS4LA](https://github.com/THIS4LA)
- Frontend Repo : [NextChat-ChatApp-FrontEnd](https://github.com/THIS4LA/NextChat-ChatApp-FrontEnd)
- Backend Repo  : [NextChat-ChatApp-BackEnd](https://github.com/THIS4LA/NextChat-ChatApp-BackEnd)

---

## 🌟 Show Your Support

If you found this project helpful, please ⭐ the repository to show your support and help it grow!

---
