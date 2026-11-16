// Known free email providers and their real domain(s).
// Only flags a typo when the part before the dot matches one of these labels
// exactly (e.g. "gmail") but the full domain isn't a real one for that
// provider (e.g. "gmail.co" instead of "gmail.com"). A domain that doesn't
// match any of these labels is never flagged, however short/unusual its TLD.
const KNOWN_PROVIDERS = {
    gmail: ["gmail.com"],
    outlook: ["outlook.com", "outlook.fr"],
    hotmail: ["hotmail.com", "hotmail.fr"],
    yahoo: ["yahoo.com", "yahoo.fr"],
    icloud: ["icloud.com"],
    live: ["live.com", "live.fr"],
    orange: ["orange.fr"],
    free: ["free.fr"],
    laposte: ["laposte.net"],
    wanadoo: ["wanadoo.fr"],
    msn: ["msn.com"],
};

// Returns the likely intended email ("name@gmail.com") if the domain looks
// like a typo'd version of a known provider, otherwise null.
export const findEmailDomainTypo = (email) => {
    const value = (email || "").trim().toLowerCase();
    const match = /^([^@]+)@([^.]+)\.(.+)$/.exec(value);

    if (!match) {
        return null;
    }

    const [, localPart, label, tld] = match;
    const domain = `${label}.${tld}`;
    const knownDomains = KNOWN_PROVIDERS[label];

    if (!knownDomains || knownDomains.includes(domain)) {
        return null;
    }

    return `${localPart}@${knownDomains[0]}`;
};
