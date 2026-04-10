declare module "nodemailer" {
  export type TransportOptions = {
    service?: string;
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user?: string;
      pass?: string;
    };
  };

  export type SendMailOptions = {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
  };

  export type SentMessageInfo = {
    accepted: string[];
    rejected: string[];
    response?: string;
  };

  export type Transporter = {
    sendMail: (mailOptions: SendMailOptions) => Promise<SentMessageInfo>;
  };

  type NodemailerModule = {
    createTransport: (options: TransportOptions) => Transporter;
  };

  const nodemailer: NodemailerModule;
  export default nodemailer;
}
