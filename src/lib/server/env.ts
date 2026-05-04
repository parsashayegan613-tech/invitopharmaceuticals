export const requireServerEnv = (name: string) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
};

export const getNotifyEmail = () => process.env.RFQ_NOTIFY_EMAIL || "info@invitvo.com";
