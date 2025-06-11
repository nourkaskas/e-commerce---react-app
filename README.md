
# 📝 Blog App – React + Zustand + Tailwind

A simple, interactive blog application that displays articles from a mock API (JSONPlaceholder), with the ability to log in, like, and comment on articles.

---

## Screenshots:

### home
![home](./screenshots/homeScreen.png)

### Detalis
![Detalis](./screenshots/details1.png)
![Comment](./screenshots/comment.png)

### Favorites
![Favorites](./screenshots/favorites.png)

### Login
![Login](./screenshots/login.png)

## Profile
![Profile](./screenshots/profile.png)

----------------------------------------------------------

## 🚀 Operating steps

1. **Download the project:**

```bash
git clone <Repository Link >
cd blog-app
```

2. **Installing packages:**

```bash
npm install
```

3. **Run the application:**

```bash
npm run dev
```

Open your browser and go to:  
[http://localhost:5173](http://localhost:5173)

---------------------------------------------------------------------

## 🔐 Login mechanism:

- To log in, go to the **Login** page from the navigation bar or directly via the link:
👉 `/login`

- Enter your **email address** (no password required).
- Your email address will be stored in `localStorage` for local login.
- After logging in, you can:
- Add comments.
- Add or remove favorites.
- Access your "Favorites" and "Profile" pages.

---------------------------------------------------------------------------------------

## 🔗 Page links:

| Page | Link | Description |
|---|-------------------|-------|
| 🏠 Home | `/` | View all articles |
| ⭐ Favorites | `/favorites` | View articles you have added to your favorites |
| 👤 Profile | `/profile` | View registered user data |
| 🔐 Login | `/login` | Email login page |
| 📄 Article details | `/posts/:id` | View details and comments for each article |

----------------------------------------------------------------------------------------

## 💡 Notes

- Comments and likes are local (not linked to a real database).
- Favorites are stored using `localStorage`.
- Login status is managed using Zustand.