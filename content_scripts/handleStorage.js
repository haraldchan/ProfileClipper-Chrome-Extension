const ls = {};
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    ls[key] = value;
}

chrome.runtime.sendMessage({ ls: ls })