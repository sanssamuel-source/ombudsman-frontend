# 🛡️ Ombudsman Digital Portal

A secure, transparent platform for citizens to report public service issues and track their resolution in Sierra Leone.

## ✨ Features

- **Submit Complaints**: File complaints against ministries or officials with evidence upload
- **Track Status**: Monitor complaint progress using a unique Reference ID
- **Admin Dashboard**: Manage and update complaint statuses
- **Secure & Anonymous**: Optional phone number and NIN for verification
- **Location-Based**: Support for all major Sierra Leone cities
- **Audit Trail**: Complete history of status changes

## 🚀 Quick Deploy to Vercel

### Step 1: Upload to GitHub

1. Create a new repository on [GitHub](https://github.com)
2. Name it `ombudsman-portal` (or any name you prefer)
3. Upload all files from this folder to the repository
4. Make sure `vercel.json` is in the root directory

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your `ombudsman-portal` repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Environment Variables**: Add one variable:
     - Key: `VITE_API_URL`
     - Value: `/api`
5. Click **Deploy**

### Step 3: Test Your Deployment

1. Visit your deployed site
2. Submit a test complaint
3. Note the Reference ID
4. Track the complaint using the Reference ID
5. Login to admin dashboard:
   - Username: `admin`
   - Password: `admin123`

## 📁 Project Structure

```
ombudsman-portal/
├── backend/              # FastAPI backend
│   ├── main.py          # Application entry point
│   ├── database.py      # Database configuration
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── requirements.txt # Python dependencies
│   ├── runtime.txt      # Python version
│   └── routers/         # API routes
│       ├── public.py    # Public endpoints
│       └── admin.py     # Admin endpoints
├── frontend/            # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   └── App.tsx      # Main app component
│   ├── package.json     # Node dependencies
│   └── vite.config.ts   # Vite configuration
└── vercel.json          # Vercel deployment config
```

## 🛠️ Technology Stack

### Backend

- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **Pydantic**: Data validation
- **SQLite**: Database (auto-configured for Vercel)

### Frontend

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS
- **Vite**: Build tool
- **React Router**: Client-side routing
- **Lucide React**: Icon library

## 🔐 Admin Access

- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ **Important**: Change these credentials in production by updating `backend/routers/admin.py`

## 📝 License

This project is open source and available for educational and governmental use.

## 🤝 Contributing

This is a hackathon project. Feel free to fork and improve!

---

**Built for Sierra Leone** 🇸🇱
