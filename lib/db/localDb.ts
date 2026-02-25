import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

// Local JSON file path for offline user storage
const DB_FILE = path.join(process.cwd(), '.local-users.json');

interface LocalUser {
    id: string;
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    createdAt: string;
}

function readUsers(): LocalUser[] {
    try {
        if (!fs.existsSync(DB_FILE)) return [];
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function writeUsers(users: LocalUser[]): void {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export function findUserByEmail(email: string): LocalUser | undefined {
    const users = readUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export async function createLocalUser(name: string, email: string, password: string): Promise<LocalUser> {
    const users = readUsers();

    // Check if already exists
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: LocalUser = {
        id: Date.now().toString(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        isVerified: true,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);
    console.log('[LOCAL DB] ✅ User saved to local file:', email);
    return newUser;
}

export async function verifyLocalPassword(email: string, password: string): Promise<LocalUser | null> {
    const user = findUserByEmail(email);
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
}
