# Deployment Guide: Updating Your Live Server

Whenever you push new code to your GitHub repository, you will need to log into your server and "pull" those changes to make them live. 

Here is the step-by-step guide to updating your live website from your computer.

## Step 1: Connect to the Server
First, open your computer's terminal (or VS Code terminal) and connect to your server using SSH.

```bash
ssh root@72.61.240.244
```
*It will prompt you for your root password. Type it in and press Enter (the password will be hidden while typing).*

## Step 2: Navigate to Your Project
Once you are logged into the server, go to the folder where your project is stored. 

```bash
cd demo1
```

## Step 3: Pull the Latest Code
Download the new code you just pushed to GitHub.

```bash
git pull origin main
```
*(If your branch is named differently, replace `main` with your branch name).*

## Step 4: Update the Backend (If Applicable)
If your recent changes included backend updates (like in the `backend/` folder) or if you added new packages to the backend, follow these steps:

```bash
# Go to the backend folder
cd backend

# Install any new packages you might have added
npm install

# Restart the backend server using PM2
pm2 restart all
```
*Note: If you named your PM2 process something specific (like `backend`), run `pm2 restart backend` instead of `all`.*

## Step 5: Update the Frontend (If Applicable)
If your recent changes included frontend updates (like changing React components, CSS, or adding frontend packages), follow these steps:

```bash
# Go back to the main project folder
cd ..

# Add your keys to the server's .env files so the build can see them
echo "VITE_RECAPTCHA_SITE_KEY=6LdM_gYtAAAAAMojxWTkMf6bpU8a85jUeMa5XheE" >> /root/demo1/.env
echo "RECAPTCHA_SECRET_KEY=6LdM_gYtAAAAAIHAAqAybhl-cz9uDBOberVA8cbW" >> /root/demo1/backend/.env

# Install any new frontend packages
npm install

# Rebuild the static frontend files
npm run build

# Clear the old live files and copy the newly built ones to Nginx's folder
rm -rf /var/www/dmfmop-frontend/*
cp -a build/. /var/www/dmfmop-frontend/
```

## Step 6: Verify
Your changes are now live! You can type `exit` in the terminal to close the SSH connection to the server. Go to your website in your browser and refresh (you may need to do a hard refresh: `Ctrl + Shift + R` or `Cmd + Shift + R`) to see your updates.
