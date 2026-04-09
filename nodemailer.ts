type MailOptions = {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

type TransportConfig = {
  service?: string;
  auth?: {
    user?: string;
    pass?: string;
  };
};

type SendMailResult = {
  accepted: string[];
  rejected: string[];
  response: string;
};

function encodeRecipient(recipient: string) {
  return encodeURIComponent(recipient.trim());
}

async function sendViaFormSubmit(options: MailOptions): Promise<SendMailResult> {
  const payload = {
    _subject: options.subject,
    _template: "table",
    from: options.from,
    to: options.to,
    text: options.text ?? "",
    html: options.html ?? "",
  };

  const response = await fetch(`https://formsubmit.co/ajax/${encodeRecipient(options.to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      accepted: [],
      rejected: [options.to],
      response: `${response.status} ${response.statusText}`,
    };
  }

  return {
    accepted: [options.to],
    rejected: [],
    response: "queued",
  };
}

const nodemailer = {
  createTransport(_config: TransportConfig) {
    return {
      async sendMail(options: MailOptions) {
        return sendViaFormSubmit(options);
      },
    };
  },
};

export default nodemailer;
