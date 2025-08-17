# 🚀 Whatsapify – Supercharge Your Shopify Customer Support in WhatsApp

**Whatsapify** is a powerful **Chrome Extension** that brings the full capabilities of the Shopilam platform directly into **WhatsApp Web** — allowing Shopify sellers to manage customer interactions, browse catalogs, share product details, and even place orders **without switching tabs**.

> 🤝 Built with **ReactJS**, REST **API integrations**, and smart **browser automation**, Whatsapify bridges the gap between eCommerce and real-time customer engagement.

## ✨ Key Features

| Feature | Description |
|--------|-------------|
| 🔐 **Login with Shopilam Account** | Securely connect and manage multiple Shopify stores in seconds |
| 📂 **Product Catalog Sidebar** | Browse shop catalog directly within WhatsApp |
| 🖱️ **One-Click Product Sharing** | Send full product details (images + descriptions) to customers |
| 📦 **Place Orders in WhatsApp** | Create orders without visiting the Shopilam dashboard |
| 📝 **Quick Reply Templates** | Accelerate responses with predefined or custom templates |
| 🗒️ **Customer Notes** | Keep private notes for personalized follow-ups |
| 💬 **Chat Without Saving Numbers** | Instantly start new conversations with any number |
| 🏪 **Vendor Information Access** | View vendor/store info in real-time |
| 📞 **Contact Info Extraction** | Automatically detect current chat’s name and number |
| 🔔 **Unread Message Tracking** | Highlight pending inquiries and unread chats |
| 📥 **Import Contacts** | Batch import and organize customers |
| ⏰ **Snooze & Follow-Ups** | Set reminders to reply later and never miss a lead |

## 💡 About Shopilam

**Shopilam** is an all-in-one eCommerce platform that helps Shopify sellers:

- Organize products and vendor data  
- Track orders  
- Centralize customer communication in a single dashboard

With **Whatsapify**, we bring the same functionality directly into WhatsApp Web — where most of the customer discussions actually happen.

## 🛠️ Tech Stack

| Layer         | Technology           |
|---------------|----------------------|
| Frontend      | ReactJS              |
| APIs          | REST / Shopilam APIs |
| Browser Layer | Chrome Extension APIs |
| Automation    | DOM Scripting + Content Scripts |

## ✅ Installation

> ⚠️ This extension is still under development. The following instructions are for **local development setup**.

```bash
git clone https://github.com/yourusername/whatsapify.git
cd whatsapify
npm install
```

### Run in Development Mode

```bash
npm run build
```

1. Open **chrome://extensions/**
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `/build` folder  
5. Open **WhatsApp Web**, login to Shopilam from the sidebar and start using Whatsapify! ✅

## 📦 Production Build

```bash
npm run build:prod
```

This will generate a `/dist` folder containing the compiled extension ready for upload to the Chrome Web Store.


## 🤝 Contributing

Pull requests are welcome!  
If you’d like to propose a new feature or fix a bug, please open an issue first to discuss your idea.

**Steps**  
- Fork the repository  
- Create a new branch (`feature/my-feature`)  
- Commit your changes  
- Open a **pull request**

## 🪪 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.
