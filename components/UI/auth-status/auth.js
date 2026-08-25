export const auth = {
    authenticated: false,
    user: null,

    async init() {
        try {
            const response = await fetch(
                "http://localhost:3000/auth/status",
                {
                    credentials: "include"
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();

            this.authenticated = true;
            this.user = data.user;
        } catch {
            this.authenticated = false;
            this.user = null;
        }
    },

    async logout() {
        await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        this.authenticated = false;
        this.user = null;

        window.dispatchEvent(new Event("auth-changed"));
    }
};