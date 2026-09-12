/* Bu dosya sadece portfolyo sitesindeki demo build icin var.
   Gercek backend yok, tum veri burada sahte olarak duruyor. */

import avatarMert from "./assets/demo/avatar-mert.jpg";
import avatarKaan from "./assets/demo/avatar-kaany.jpg";
import avatarEnder from "./assets/demo/avatar-ender.jpg";
import avatarSam from "./assets/demo/avatar-samt.jpg";
import avatarEmre from "./assets/demo/avatar-emred.jpg";
import avatarRiza from "./assets/demo/avatar-rizab.jpg";
import avatarCigdem from "./assets/demo/avatar-ayseo.jpg";
import avatarCan from "./assets/demo/avatar-canp.jpg";
import avatarElif from "./assets/demo/avatar-elifk.jpg";
import bugScreenshot from "./assets/demo/bug-screenshot.png";

function minutesAgo(n) {
    return new Date(Date.now() - n * 60000).toISOString();
}

const ME = {
    id: 1, username: "mert", full_name: "Mert Creator",
    role: "Full Stack Developer", department: "Engineering",
    online: true, profile_photo: avatarMert, email: "mert@artsconnect.dev",
};

const USERS = [
    ME,
    { id: 2, username: "kaany", full_name: "Kaan Yilmaz", role: "Backend Developer", department: "Engineering", online: true, profile_photo: avatarKaan, email: "kaany@artsconnect.dev" },
    { id: 3, username: "ender", full_name: "Ender Yilmaz", role: "Frontend Developer", department: "Engineering", online: false, profile_photo: avatarEnder, email: "ender@artsconnect.dev" },
    { id: 4, username: "samt", full_name: "Sam Taylor", role: "UI/UX Designer", department: "Design", online: true, profile_photo: avatarSam, email: "samt@artsconnect.dev" },
    { id: 5, username: "emred", full_name: "Emre Demir", role: "Product Manager", department: "Product", online: false, profile_photo: avatarEmre, email: "emred@artsconnect.dev" },
    { id: 6, username: "rizab", full_name: "Riza Bulut", role: "QA Engineer", department: "Engineering", online: false, profile_photo: avatarRiza, email: "rizab@artsconnect.dev" },
    { id: 7, username: "cigdemy", full_name: "Cigdem Yilmaz", role: "Backend Developer", department: "Engineering", online: false, profile_photo: avatarCigdem, email: "cigdemy@artsconnect.dev" },
    { id: 8, username: "canp", full_name: "Can Polat", role: "DevOps Engineer", department: "Engineering", online: false, profile_photo: avatarCan, email: "canp@artsconnect.dev" },
    { id: 9, username: "elifk", full_name: "Elif Kara", role: "Marketing Specialist", department: "Product", online: false, profile_photo: avatarElif, email: "elifk@artsconnect.dev" },
];

function findUser(id) {
    return USERS.find((u) => u.id === id);
}

let nextChatId = 10;
let nextMessageId = 100;

// her sohbet ME ile bir diger kullanici arasinda, mesajlar zamana gore
const CHATS = [
    {
        id: 2, otherUserId: 2, messages: [
            { id: nextMessageId++, sender: "kaany", topic: "", content: "Hey, are we still on for the sprint review?", image: null, created_at: minutesAgo(90) },
            { id: nextMessageId++, sender: "mert", topic: "", content: "Yep, 3pm works for me.", image: null, created_at: minutesAgo(87) },
            { id: nextMessageId++, sender: "kaany", topic: "", content: "Cool, I will send the agenda before that.", image: null, created_at: minutesAgo(84) },
            { id: nextMessageId++, sender: "mert", topic: "", content: "Sounds good, thanks!", image: null, created_at: minutesAgo(81) },
            { id: nextMessageId++, sender: "kaany", topic: "Sprint Planning", content: "Found a weird bug in the WebSocket handler, check this out", image: null, created_at: minutesAgo(14) },
            { id: nextMessageId++, sender: "kaany", topic: "Sprint Planning", content: "", image: bugScreenshot, created_at: minutesAgo(13) },
            { id: nextMessageId++, sender: "mert", topic: "Sprint Planning", content: "Oh nice catch, we should send an error frame back instead of just returning", image: null, created_at: minutesAgo(12) },
            { id: nextMessageId++, sender: "kaany", topic: "Sprint Planning", content: "Exactly, I will open a PR for it today", image: null, created_at: minutesAgo(11) },
            { id: nextMessageId++, sender: "mert", topic: "Sprint Planning", content: "Sounds good 👍", image: null, created_at: minutesAgo(10) },
            { id: nextMessageId++, sender: "mert", topic: "", content: "By the way, are you free for a quick call later?", image: null, created_at: minutesAgo(5) },
            { id: nextMessageId++, sender: "kaany", topic: "", content: "Sure, ping me after 4.", image: null, created_at: minutesAgo(3) },
            { id: nextMessageId++, sender: "kaany", topic: "", content: "See you soon 👍", image: null, created_at: minutesAgo(1) },
        ],
    },
    {
        id: 3, otherUserId: 7, messages: [
            { id: nextMessageId++, sender: "cigdemy", topic: "", content: "DB migration ran clean on staging.", image: null, created_at: minutesAgo(20) },
        ],
    },
    {
        id: 4, otherUserId: 6, messages: [
            { id: nextMessageId++, sender: "rizab", topic: "", content: "Found an edge case in message search.", image: null, created_at: minutesAgo(40) },
            { id: nextMessageId++, sender: "mert", topic: "", content: "Thanks, logging it now.", image: null, created_at: minutesAgo(38) },
        ],
    },
    {
        id: 5, otherUserId: 3, messages: [
            { id: nextMessageId++, sender: "ender", topic: "", content: "Fixed the topic tab overflow bug.", image: null, created_at: minutesAgo(60) },
        ],
    },
    {
        id: 6, otherUserId: 5, messages: [
            { id: nextMessageId++, sender: "emred", topic: "", content: "Can we push the release to Thursday?", image: null, created_at: minutesAgo(80) },
            { id: nextMessageId++, sender: "mert", topic: "", content: "Works on my side.", image: null, created_at: minutesAgo(78) },
        ],
    },
    {
        id: 7, otherUserId: 4, messages: [
            { id: nextMessageId++, sender: "samt", topic: "", content: "New mockups are ready for the profile page.", image: null, created_at: minutesAgo(100) },
            { id: nextMessageId++, sender: "mert", topic: "", content: "Nice, sending feedback by EOD.", image: null, created_at: minutesAgo(98) },
        ],
    },
];

function messageCount(username) {
    return CHATS.reduce(
        (total, chat) => total + chat.messages.filter((m) => m.sender === username).length,
        0
    );
}

function getTeam(user) {
    return USERS.filter((u) => u.id !== user.id && u.department === user.department)
        .map(({ id, username, full_name, role, department, online, profile_photo }) => (
            { id, username, full_name, role, department, online, profile_photo }
        ));
}

function getUserDetail(id) {
    const user = findUser(id);
    if (!user) return null;

    return {
        ...user,
        team: getTeam(user),
        message_count: messageCount(user.username),
    };
}

function lastMessageOf(chat) {
    return chat.messages[chat.messages.length - 1] || null;
}

function shapeChat(chat) {
    const last = lastMessageOf(chat);

    return {
        id: chat.id,
        user: findUser(chat.otherUserId),
        last_message: last ? last.content : null,
        last_message_at: last ? last.created_at : null,
    };
}

function getChats() {
    return [...CHATS]
        .sort((a, b) => {
            const at = lastMessageOf(a)?.created_at || "";
            const bt = lastMessageOf(b)?.created_at || "";
            return bt.localeCompare(at);   // en yeni ustte
        })
        .map(shapeChat);
}

function getMessages(chatId) {
    const chat = CHATS.find((c) => c.id === chatId);
    if (!chat) return [];

    return chat.messages.map(({ id, sender, topic, content, image, created_at }) => (
        { id, sender, topic, content, image, created_at }
    ));
}

function deleteChat(chatId) {
    const index = CHATS.findIndex((c) => c.id === chatId);
    if (index !== -1) CHATS.splice(index, 1);

    return { message: "Chat deleted." };
}

function searchUsers(query) {
    return USERS
        .filter((u) => u.id !== ME.id)
        .filter((u) => u.full_name.toLowerCase().includes(query.toLowerCase()))
        .map(({ id, username, full_name, role, department, online, profile_photo }) => (
            { id, username, full_name, role, department, online, profile_photo }
        ));
}

function createChat(otherUserId) {
    let chat = CHATS.find((c) => c.otherUserId === otherUserId);

    if (!chat) {
        chat = { id: nextChatId++, otherUserId, messages: [] };
        CHATS.push(chat);
    }

    return shapeChat(chat);
}

function ok(data) {
    return { ok: true, status: 200, json: async () => data };
}

function fail(data, status = 400) {
    return { ok: false, status, json: async () => data };
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function handleMockRequest(path, method, body) {
    await delay(250);   // gercekci bir agirlik hissi versin

    if (method === "POST" && path === "/api/login/") {
        if (!body.username || !body.password) {
            return fail({ error: "Invalid username or password." });
        }
        return ok({ message: "Login successfully", token: "demo-token" });
    }

    if (method === "POST" && path === "/api/register/") {
        if (body.password !== body.confirm_password) {
            return fail({ errors: { __all__: ["Passwords do not match."] } });
        }
        return ok({ message: "Registration successful.", token: "demo-token" });
    }

    if (method === "POST" && path === "/api/logout/") {
        return ok({ message: "Logout successful." });
    }

    if (path === "/api/me/") {
        return ok(getUserDetail(ME.id));
    }

    if (path === "/api/chats/" && method === "GET") {
        return ok(getChats());
    }

    if (path === "/api/chats/" && method === "POST") {
        return ok(createChat(body.user_id));
    }

    const chatMatch = path.match(/^\/api\/chats\/(\d+)\/messages\/$/);
    if (chatMatch && method === "GET") return ok(getMessages(Number(chatMatch[1])));
    if (chatMatch && method === "DELETE") return ok(deleteChat(Number(chatMatch[1])));

    if (path.startsWith("/api/users/search/")) {
        const query = new URL(path, "http://demo").searchParams.get("username") || "";
        return ok(searchUsers(query));
    }

    const userMatch = path.match(/^\/api\/users\/(\d+)\/$/);
    if (userMatch) return ok(getUserDetail(Number(userMatch[1])));

    return fail({ error: "Not found." }, 404);
}

// gercek websocket yerine: gonderilen mesaji ayni kisiye geri yansitiyor
export class MockSocket {
    constructor(chatId) {
        this.chatId = chatId;
        this.onmessage = null;
    }

    send(dataStr) {
        const { content, topic } = JSON.parse(dataStr);
        const chat = CHATS.find((c) => c.id === this.chatId);
        if (!chat) return;

        const message = {
            id: nextMessageId++,
            sender: ME.username,
            topic: topic || "",
            content,
            image: null,
            created_at: new Date().toISOString(),
        };

        chat.messages.push(message);

        setTimeout(() => {
            if (this.onmessage) this.onmessage({ data: JSON.stringify(message) });
        }, 150);
    }

    close() {}
}
