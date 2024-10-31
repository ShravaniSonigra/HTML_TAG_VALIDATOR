document.getElementById('validateButton').addEventListener('click', function() {
    const input = document.getElementById('htmlInput').value;
    const resultDiv = document.getElementById('result');

    const validation = validateHTML(input);

    if (validation.isValid) {
        resultDiv.textContent = 'Valid HTML!';
        resultDiv.style.color = 'green';
    } else {
        resultDiv.innerHTML = `Invalid HTML! Invalid tags: ${validation.invalidTags.join(', ')}<br>`;
        resultDiv.innerHTML += `Valid tags: ${getValidTagsList()}`;
        resultDiv.style.color = 'red';
    }
});

function validateHTML(html) {
    const tagPattern = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    const stack = new Stack();
    const invalidTags = [];
    let match;

    while ((match = tagPattern.exec(html)) !== null) {
        const tag = match[0];
        const tagName = match[1].toLowerCase();

        // Check for malformed tags
        if (!isValidTag(tag) || !isValidHTMLTag(tagName)) {
            invalidTags.push(tag);
            continue; // Skip further processing for this tag
        }

        if (tag.startsWith('</')) {
            // Closing tag
            if (stack.isEmpty() || stack.pop() !== tagName) {
                invalidTags.push(tag); // Unmatched closing tag
            }
        } else {
            // Opening tag
            stack.push(tagName);
        }
    }

    // If there are still open tags, they are invalid
    while (!stack.isEmpty()) {
        invalidTags.push(`<${stack.pop()}>`); // Add unclosed tags
    }

    return {
        isValid: invalidTags.length === 0, // No invalid tags
        invalidTags: invalidTags
    };
}

function isValidTag(tag) {
    // Check for nested angle brackets or malformed syntax
    return !(/<[^>]*<[^>]*>/g.test(tag) || /<[^>]*\s*<[^>]*>/g.test(tag) || /<\/?>\s*<\/?>/g.test(tag));
}

function isValidHTMLTag(tagName) {
    // List of valid HTML tags
    const validTags = [
        'html', 'head', 'title', 'body', 'div', 'span', 'a', 'p', 'h1', 'h2',
        'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
        'form', 'input', 'button', 'label', 'select', 'option', 'textarea'
    ];
    return validTags.includes(tagName);
}

// Linked List and Stack Implementation
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    add(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    remove() {
        if (!this.head) return null; // Stack is empty
        if (!this.head.next) {
            const value = this.head.value;
            this.head = null; // Stack is now empty
            return value;
        }

        let current = this.head;
        while (current.next && current.next.next) {
            current = current.next;
        }

        const value = current.next.value;
        current.next = null; // Remove last node
        return value;
    }

    isEmpty() {
        return this.head === null;
    }
}

class Stack {
    constructor() {
        this.list = new LinkedList();
    }

    push(value) {
        this.list.add(value);
    }

    pop() {
        return this.list.remove();
    }

    isEmpty() {
        return this.list.isEmpty();
    }
}

function getValidTagsList() {
    const validTags = [
        'html', 'head', 'title', 'body', 'div', 'span', ' a', 'p', 'h1', 'h2',
        'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
        'form', 'input', 'button', 'label', 'select', 'option', 'textarea'
    ];
    return `Valid HTML tags: ${validTags.join(', ')}`;
}
