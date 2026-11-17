// Legal content for ToonHaus Publishing.
// Privacy Policy and Terms and Conditions are taken from the 23 Oct content docs.
// The Refund Policy is drafted to match Section 6 (Refunds and Cancellations) of the Terms.

export type LegalSlug = "privacy-policy" | "terms-and-conditions" | "refund-policy";

export type LegalListItem = { label?: string; text: string };

export type LegalBlock =
    | { type: "p"; text: string }
    | { type: "list"; items: LegalListItem[] }
    | { type: "link"; text: string; label: string; href: string }
    | { type: "contact" };

export interface LegalSection {
    id: string;
    title: string;
    blocks: LegalBlock[];
}

export interface LegalDocument {
    slug: LegalSlug;
    href: string;
    title: string;
    /** ISO date, used for formatting and <time dateTime> */
    effectiveDate: string;
    headline: { lead: string; accent: string };
    summary: string;
    highlights: string[];
    sections: LegalSection[];
}

/** Fill these in once and every policy page updates. */
export const COMPANY = {
    name: "Toon Haus Publishing",
    email: "support@toonhauspublishing.com",
    phone: "(949) 828-2170",
    address: "2913 El Camino Real, Tustin, CA 92782, United States",
    website: "https://toonhauspublishing.com/",
} as const;

export const LEGAL_ROUTES: Record<LegalSlug, string> = {
    "privacy-policy": "/privacy-policy",
    "terms-and-conditions": "/terms-and-conditions",
    "refund-policy": "/refund-policy",
};

/* ------------------------------------------------------------------ helpers */

const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

const section = (title: string, ...blocks: LegalBlock[]): LegalSection => ({ id: slugify(title), title, blocks });
const p = (text: string): LegalBlock => ({ type: "p", text });
const list = (...items: (string | LegalListItem)[]): LegalBlock => ({
    type: "list",
    items: items.map((i) => (typeof i === "string" ? { text: i } : i)),
});
const link = (text: string, label: string, href: string): LegalBlock => ({ type: "link", text, label, href });
const contact: LegalBlock = { type: "contact" };

/* ----------------------------------------------------------- privacy policy */

const privacyPolicy: LegalDocument = {
    slug: "privacy-policy",
    href: LEGAL_ROUTES["privacy-policy"],
    title: "Privacy Policy",
    effectiveDate: "2026-10-24",
    headline: { lead: "How we protect ", accent: "your information and your manuscript" },
    summary:
        "What we collect when you visit our website or work with us, how we use it, who we share it with, and the choices you have.",
    highlights: [
        "We never sell your personal information",
        "Unpublished manuscripts are kept confidential",
        "Ask to access, correct, or delete your data",
        "Unsubscribe from marketing emails anytime",
    ],
    sections: [
        section(
            "Introduction",
            p(
                "Welcome to ToonHaus Publishing. We value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you visit our website, contact our team, or use our publishing and related services."
            ),
            p(
                "By accessing our website or engaging with our services, you acknowledge that you have read this Privacy Policy. Where consent is legally required, we will obtain it before processing your personal information."
            )
        ),
        section(
            "Information We Collect",
            p("ToonHaus Publishing may collect the following categories of information:"),
            list(
                {
                    label: "Personal Information",
                    text: "Your name, email address, phone number, mailing address, and other contact details you provide through our website, inquiry forms, or direct communications.",
                },
                {
                    label: "Project and Manuscript Information",
                    text: "Details about your book, writing goals, project requirements, manuscript files, editing instructions, cover design preferences, and other materials you submit for publishing services.",
                },
                {
                    label: "Payment and Transaction Information",
                    text: "Billing details, transaction records, and information necessary to process payments for our services. Payment card information may be handled directly by third-party payment processors.",
                },
                {
                    label: "Technical Information",
                    text: "Your IP address, browser type, device information, operating system, referring pages, and general website usage data collected through cookies or similar technologies, where applicable.",
                },
                {
                    label: "Communication Information",
                    text: "Messages, inquiries, feedback, and other correspondence you share with us.",
                }
            )
        ),
        section(
            "How We Use Your Information",
            p("We may use your information to:"),
            list(
                "Respond to inquiries and provide customer support.",
                "Prepare service proposals, quotations, and project estimates.",
                "Deliver book writing, editing, proofreading, formatting, cover design, publishing, marketing, and other requested services.",
                "Communicate with you about project updates, deadlines, revisions, and deliverables.",
                "Process payments, maintain transaction records, and manage billing.",
                "Improve our website, services, customer experience, and internal operations.",
                "Send promotional emails, service announcements, or relevant updates where permitted by law.",
                "Detect fraudulent activity, protect our systems, and comply with applicable legal obligations."
            ),
            p(
                "We process personal information only for appropriate purposes and on a lawful basis, as applicable under relevant data protection laws."
            )
        ),
        section(
            "Manuscript Confidentiality and Intellectual Property",
            p(
                "ToonHaus Publishing understands that manuscripts, unpublished books, creative concepts, illustrations, and related project materials may contain valuable intellectual property and confidential information."
            ),
            p(
                "We use submitted materials to provide the services you request, communicate about your project, and fulfill our contractual obligations. We do not intentionally publish, sell, or disclose your unpublished manuscript to unrelated third parties for their independent use without your authorization, unless disclosure is legally required."
            ),
            p(
                "We may share project materials with authorized employees, contractors, editors, designers, production specialists, or service providers when reasonably necessary to complete your project. Such access should be limited to what is needed for the assigned work and subject to appropriate confidentiality protections."
            ),
            p(
                "You retain ownership of your intellectual property to the extent established by your agreement with us and applicable law. Any transfer, license, or assignment of rights will be governed by the relevant service agreement."
            ),
            p("Please avoid submitting sensitive personal information that is not necessary for your publishing project.")
        ),
        section(
            "Cookies and Tracking Technologies",
            p(
                "Our website may use cookies, pixels, analytics tools, and similar technologies to improve website functionality, understand visitor behavior, remember preferences, and measure marketing performance."
            ),
            p("These technologies may collect information about how visitors interact with our website."),
            p(
                "You can manage or disable cookies through your browser settings. Some website features may not function properly if certain cookies are disabled. Where required by law, we will request consent before using non-essential cookies or similar tracking technologies."
            )
        ),
        section(
            "Sharing Your Information",
            p("ToonHaus Publishing does not sell your personal information to third parties for their independent marketing purposes."),
            p("We may share information in the following circumstances:"),
            list(
                {
                    label: "Service Providers",
                    text: "With trusted providers that assist with website hosting, payment processing, email communications, analytics, file storage, and other business operations.",
                },
                { label: "Project Partners", text: "With authorized professionals involved in delivering your requested publishing services." },
                {
                    label: "Publishing and Distribution Platforms",
                    text: "With relevant platforms, printers, distributors, or retailers when necessary to fulfill publishing or distribution services you have requested.",
                },
                {
                    label: "Legal Requirements",
                    text: "When disclosure is required by law, a valid legal process, or a lawful request from an appropriate authority.",
                },
                {
                    label: "Business Transactions",
                    text: "In connection with a merger, acquisition, restructuring, or transfer of business assets, subject to applicable legal requirements.",
                },
                {
                    label: "Protection and Security",
                    text: "When reasonably necessary to protect our rights, property, systems, customers, or the safety of others.",
                }
            ),
            p("Third-party providers may process information under their own privacy policies and applicable contractual obligations.")
        ),
        section(
            "Data Security",
            p(
                "We take reasonable technical, administrative, and organizational measures to protect personal information and project materials against unauthorized access, loss, misuse, alteration, and disclosure."
            ),
            p(
                "These measures may include access restrictions, secure file handling, password-protected systems, and appropriate safeguards for information shared with service providers."
            ),
            p(
                "However, no method of electronic transmission or storage is completely secure. While we work to protect your information, we cannot guarantee absolute security."
            )
        ),
        section(
            "Data Retention",
            p(
                "We retain personal information for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy, provide contracted services, maintain business and financial records, resolve disputes, enforce agreements, and comply with applicable legal obligations."
            ),
            p(
                "Manuscripts and other project files may be retained during the engagement and for a reasonable period afterward when needed for revisions, customer support, recordkeeping, or contractual purposes."
            ),
            p(
                "When information is no longer required, we will take reasonable steps to delete it, securely destroy it, or anonymize it, subject to applicable law and legitimate recordkeeping requirements."
            )
        ),
        section(
            "Your Privacy Rights",
            p("Depending on your location and applicable law, you may have the right to:"),
            list(
                "Request access to the personal information we hold about you.",
                "Request correction of inaccurate or incomplete information.",
                "Request deletion of your personal information in eligible circumstances.",
                "Object to or request restrictions on certain types of processing.",
                "Request a copy of certain information in a portable format.",
                "Withdraw consent where processing is based on consent.",
                "Opt out of marketing communications.",
                "Lodge a complaint with the relevant data protection authority."
            ),
            p(
                "These rights may be subject to legal exceptions and limitations. To submit a request, contact us using the details provided below. We may need to verify your identity before responding."
            )
        ),
        section(
            "Pseudonym Policy",
            p("We hold a policy of using the pseudonym to ensure the following:"),
            p("With a view to avoid undue confusion and hassle at our customers end when they are assigned a new account manager, we use pseudonyms; it helps our customers remain connected with a single point of contact and remember their name comfortably."
            ),
            p("Moreover; as our staff comprises of people from different regions and cultures, hence the use of pseudonym helps us present a uniform culture of the organization."
            ),
            p('You can opt out of SMS communications by replying with the word "STOP" to any message you receive from us. To unsubscribe from emails, click the "unsubscribe" link in any of our emails or contact us directly at support@toonhauspublishing.com.'
            ),
        ),
        section(
            "Third-Party Websites and Services",
            p(
                "Our website may contain links to third-party websites, publishing platforms, payment providers, social media services, or other external resources."
            ),
            p(
                "ToonHaus Publishing does not control the privacy practices or content of these third parties. Your interactions with them are governed by their respective terms and privacy policies. We encourage you to review those policies before sharing personal information with external services."
            )
        ),
        section(
            "Email and Marketing Communications",
            p(
                "We may use your contact information to send project-related messages, service updates, invoices, and other communications necessary to manage our relationship with you."
            ),
            p(
                "Where permitted by law, we may also send promotional emails about our services, offers, or publishing resources. You can unsubscribe from promotional communications at any time by following the instructions in the email or contacting us directly."
            ),
            p(
                "Unsubscribing from marketing messages will not prevent us from sending essential communications related to your active project, transactions, or legal obligations."
            )
        ),
        section(
            "Children's Privacy",
            p(
                "ToonHaus Publishing does not knowingly collect personal information directly from children under the age at which applicable law permits them to provide it independently without the required parental or guardian involvement."
            ),
            p(
                "If our services involve books written for children, the fact that a manuscript features child characters or is intended for young readers does not mean we need to collect personal information from those readers."
            ),
            p(
                "If you believe a child has provided personal information to us without the required authorization, please contact us so that we can review the matter and take appropriate action."
            )
        ),
        section(
            "International Data Transfers",
            p(
                "ToonHaus Publishing may use service providers or publishing partners located in different countries. As a result, personal information may be processed or stored outside your country of residence."
            ),
            p(
                "Where applicable, we will take reasonable steps to ensure that international transfers are handled in accordance with relevant data protection requirements and appropriate safeguards."
            )
        ),
        section(
            "Changes to This Privacy Policy",
            p(
                "We may update this Privacy Policy periodically to reflect changes in our services, business practices, technology, or legal obligations."
            ),
            p(
                "Any revisions will be posted on this page, along with an updated effective date. We encourage you to review this page from time to time to remain informed about how we protect your information."
            )
        ),
        section(
            "Contact Us",
            p(
                "If you have questions about this Privacy Policy, wish to exercise your privacy rights, or have concerns about how your information or manuscript materials are handled, please contact ToonHaus Publishing."
            ),
            contact,
            p("We will review your inquiry and respond within a reasonable timeframe, subject to applicable legal requirements.")
        ),
    ],
};

/* ----------------------------------------------------- terms and conditions */

const termsAndConditions: LegalDocument = {
    slug: "terms-and-conditions",
    href: LEGAL_ROUTES["terms-and-conditions"],
    title: "Terms and Conditions",
    effectiveDate: "2026-10-24",
    headline: { lead: "The terms behind ", accent: "every story we help you publish" },
    summary:
        "The rules for using our website and services: how projects, payments, revisions, rights, and publishing work between you and ToonHaus Publishing.",
    highlights: [
        "You keep ownership of your original manuscript",
        "Scope and fees are agreed before work begins",
        "Revisions follow your package or agreement",
        "Platform approval and sales aren’t guaranteed",
    ],
    sections: [
        section(
            "Introduction",
            p(
                "Welcome to ToonHaus Publishing. These Terms and Conditions govern your access to and use of our website, services, and related offerings. By visiting our website, submitting an inquiry, purchasing a service, or engaging ToonHaus Publishing for a project, you agree to comply with these Terms and Conditions."
            ),
            p("If you do not agree with these terms, please refrain from using our website or services."),
            p(
                "In these terms, “ToonHaus Publishing,” “we,” “our,” and “us” refer to the company operating this website. “You” and “your” refer to any visitor, client, author, or individual using our services."
            )
        ),
        section(
            "Our Services",
            p("ToonHaus Publishing may provide a range of author and publishing services, including:"),
            list(
                "Book writing, ghostwriting, and manuscript development.",
                "Editing, proofreading, and manuscript review.",
                "Book formatting and layout design.",
                "Book cover design and illustration coordination.",
                "Ebook and print book preparation.",
                "Publishing assistance and distribution support.",
                "Book marketing, promotional materials, and author visibility services.",
                "Audiobook production and other related creative services."
            ),
            p(
                "The exact scope of each project will be determined by the service description, quotation, proposal, or written agreement provided to the client."
            ),
            p(
                "We reserve the right to modify, update, or discontinue services when reasonably necessary, subject to our existing contractual obligations."
            )
        ),
        section(
            "Eligibility and Client Responsibilities",
            p(
                "By using our services, you confirm that you are legally capable of entering into a binding agreement under the laws applicable to you."
            ),
            p("You agree to:"),
            list(
                "Provide accurate and complete information when requesting our services.",
                "Supply all necessary manuscripts, source files, instructions, references, and project materials in a timely manner.",
                "Ensure that you have the necessary rights and permissions to use any content, images, quotations, illustrations, or other materials you provide.",
                "Review drafts, proofs, designs, and other deliverables carefully before approving them.",
                "Respond to requests for clarification or approval within a reasonable timeframe.",
                "Make payments according to the agreed terms.",
                "Use our services lawfully and refrain from submitting content that infringes third-party rights or violates applicable law."
            ),
            p("Delays in providing materials, feedback, or approvals may affect project schedules and delivery dates.")
        ),
        section(
            "Orders, Quotes, and Project Agreements",
            p("A quotation or proposal outlines the services, estimated costs, deliverables, and other relevant project details."),
            p(
                "An order will be considered accepted when ToonHaus Publishing confirms the engagement in writing or otherwise establishes acceptance under the applicable agreement."
            ),
            p(
                "The scope of work will be limited to the services expressly included in the agreed proposal or package. Additional revisions, new deliverables, expanded services, or significant changes to the original brief may require additional charges and an updated timeline."
            ),
            p(
                "Any project-specific agreement that supplements these Terms and Conditions will apply to the relevant engagement. If a conflict arises, the project-specific agreement will govern to the extent of that conflict."
            )
        ),
        section(
            "Pricing and Payments",
            p("All service fees will be communicated to the client before the applicable purchase or project engagement."),
            p(
                "Depending on the project, payment arrangements may include full upfront payment, an initial deposit, milestone payments, or another mutually agreed schedule."
            ),
            p(
                "You agree to pay all charges in accordance with the agreed payment terms. Any applicable taxes, transaction fees, or third-party costs will be handled as specified in the quotation or agreement."
            ),
            p(
                "We may suspend work or withhold delivery of unpaid deliverables if a payment becomes overdue, subject to the terms of the applicable agreement and relevant law."
            ),
            p(
                "If a project requires additional services outside the agreed scope, we will communicate the additional charges for approval before proceeding with the extra work."
            )
        ),
        section(
            "Refunds and Cancellations",
            p(
                "Refund eligibility depends on the service purchased, the terms of the relevant agreement, the work already completed, and applicable consumer protection laws."
            ),
            p(
                "Because publishing services may involve customized work, such as manuscript editing, writing, formatting, illustrations, and cover design, payments may become non-refundable to the extent permitted by law once the corresponding work has been performed or third-party costs have been incurred."
            ),
            p(
                "If you wish to cancel a project, you should notify ToonHaus Publishing in writing as soon as possible. We will assess the request according to the applicable agreement, the work completed, and any costs or commitments already incurred."
            ),
            p("Any approved refund will be calculated in accordance with the applicable refund terms and legal requirements."),
            link("For full details, please read our", "Refund Policy", LEGAL_ROUTES["refund-policy"]),
            p("Nothing in this section excludes any refund or cancellation right that cannot lawfully be excluded.")
        ),
        section(
            "Project Timelines and Delivery",
            p(
                "We aim to complete projects within the estimated timelines communicated to clients. However, delivery dates may depend on project complexity, client responsiveness, the availability of required materials, revision requests, and third-party services."
            ),
            p(
                "We are not responsible for delays caused by incomplete instructions, late approvals, missing materials, circumstances beyond our reasonable control, or third-party platform decisions."
            ),
            p(
                "If a significant delay arises, we will make reasonable efforts to communicate relevant updates and discuss an appropriate revised schedule."
            )
        ),
        section(
            "Revisions and Approvals",
            p(
                "The number and scope of revisions included in a project will be stated in the relevant quotation, package description, or written agreement."
            ),
            p(
                "Revision requests must relate to the agreed scope of work. Requests that introduce new concepts, substantially change approved directions, or require additional work may incur extra charges."
            ),
            p(
                "Clients are responsible for reviewing and approving final manuscripts, cover designs, interior layouts, metadata, proofs, and other materials before publication or final delivery."
            ),
            p(
                "Once a client approves a deliverable or authorizes publication, subsequent changes may require additional fees and may be subject to third-party platform procedures and timelines."
            )
        ),
        section(
            "Intellectual Property Rights",
            p("Clients are responsible for ensuring that all materials supplied to ToonHaus Publishing may legally be used for the intended project."),
            p(
                "Unless otherwise agreed in writing, clients retain ownership of their original manuscripts and other materials they own or have the right to use."
            ),
            p(
                "Ownership, licensing, and transfer of rights in newly created deliverables, including ghostwritten content, edited manuscripts, cover designs, illustrations, and other creative work, will be governed by the applicable project agreement."
            ),
            p(
                "Where a transfer of rights is agreed, its scope and timing will be subject to the terms of that agreement, including any applicable payment conditions."
            ),
            p(
                "ToonHaus Publishing retains ownership of its pre-existing tools, templates, internal methods, workflows, and other materials developed independently of a client's project, except where otherwise agreed in writing."
            )
        ),
        section(
            "Client Representations and Copyright Compliance",
            p(
                "You represent that you own or have obtained the necessary permissions, licenses, and authorizations for all materials you submit to us."
            ),
            p(
                "You must not submit materials that knowingly infringe copyright, trademarks, privacy rights, publicity rights, or other legal rights."
            ),
            p(
                "ToonHaus Publishing does not claim ownership of client-owned content merely because it is submitted for our services. However, you grant us permission to access, reproduce, edit, format, and otherwise use the submitted materials as reasonably necessary to perform the contracted services."
            ),
            p("We may decline or suspend work involving materials that appear to violate applicable law or third-party rights.")
        ),
        section(
            "Publishing and Distribution Disclaimer",
            p(
                "ToonHaus Publishing may assist clients with preparing books for publication and submitting them to third-party retailers, printers, distributors, or publishing platforms."
            ),
            p("Unless expressly stated in a written agreement, we do not own or control these external platforms and cannot guarantee:"),
            list(
                "Acceptance or approval of a book by a publishing platform.",
                "Publication by a particular date.",
                "Retail placement, sales volume, rankings, reviews, or reader engagement.",
                "Acceptance of a specific cover, title, category, description, or metadata.",
                "Continued availability of a book on any third-party platform.",
                "Specific royalty amounts, income, profits, or commercial success."
            ),
            p(
                "Third-party platforms may apply their own content policies, technical requirements, fees, distribution conditions, and account restrictions. Clients are responsible for complying with the requirements applicable to their publishing accounts and titles."
            )
        ),
        section(
            "Marketing and Promotional Services",
            p(
                "Where ToonHaus Publishing provides marketing, advertising, promotional content, or author visibility services, we will perform the agreed tasks within the scope of the applicable project agreement."
            ),
            p(
                "Marketing results depend on multiple factors, including market conditions, book quality, audience demand, advertising budgets, pricing, competition, and third-party platform algorithms."
            ),
            p(
                "We do not guarantee a particular number of sales, downloads, reviews, followers, rankings, leads, or revenue unless a specific written agreement expressly establishes such an obligation."
            ),
            p(
                "Advertising expenditure, subscriptions, platform fees, and other external costs will be the client's responsibility where specified in the project agreement."
            )
        ),
        section(
            "Confidentiality",
            p(
                "We recognize the importance of protecting unpublished manuscripts, creative concepts, business information, and other confidential materials entrusted to us."
            ),
            p(
                "We will use reasonable measures to limit access to confidential client materials to personnel and service providers who need access to perform the agreed services."
            ),
            p(
                "Confidential information will not knowingly be disclosed to unrelated third parties except as authorized by the client, reasonably necessary to fulfill the agreement, or required by law."
            ),
            p(
                "Information that is already public, independently developed, lawfully obtained from another source, or otherwise not confidential under applicable law may fall outside these confidentiality obligations."
            )
        ),
        section(
            "Website Use and Acceptable Conduct",
            p("You agree to use our website only for lawful purposes and in a manner that does not interfere with its operation or compromise its security."),
            p("You must not:"),
            list(
                "Attempt to gain unauthorized access to our website, systems, or accounts.",
                "Introduce malicious software, harmful code, or disruptive material.",
                "Copy, reproduce, or distribute website content without permission where permission is required.",
                "Use our website to transmit fraudulent, misleading, unlawful, or infringing material.",
                "Interfere with the website's availability, functionality, or security.",
                "Misrepresent your identity or provide information intended to deceive us or other users."
            ),
            p("We reserve the right to restrict access to our website where we reasonably believe these terms have been violated.")
        ),
        section(
            "Third-Party Services and Links",
            p(
                "Our website or publishing services may involve third-party websites, payment providers, printers, retailers, distribution platforms, software providers, or other external services."
            ),
            p("These third parties operate independently and may be governed by their own terms, policies, and procedures."),
            p(
                "ToonHaus Publishing is not responsible for third-party services beyond the responsibilities expressly accepted in our agreement or imposed by applicable law. We encourage clients to review third-party terms before creating accounts, making payments, or submitting content through external platforms."
            )
        ),
        section(
            "Limitation of Liability",
            p(
                "To the maximum extent permitted by applicable law, ToonHaus Publishing will not be liable for indirect, incidental, special, or consequential losses arising from the use of our website or services, including loss of anticipated profits, sales, business opportunities, or expected commercial results."
            ),
            p(
                "We are not responsible for decisions made independently by third-party publishing platforms, retailers, distributors, advertising providers, or other external services, except to the extent liability cannot lawfully be excluded."
            ),
            p(
                "Nothing in these Terms and Conditions excludes or limits liability for fraud, willful misconduct, or any other liability that cannot legally be excluded or limited."
            ),
            p(
                "Any additional limitations on liability, including any applicable financial cap, must be consistent with the relevant project agreement and applicable law."
            )
        ),
        section(
            "Indemnification",
            p(
                "To the extent permitted by law, you agree to be responsible for third-party claims, losses, or reasonable expenses arising directly from your breach of these Terms and Conditions, your unlawful use of our services, or your submission of materials that infringe another party's rights."
            ),
            p(
                "This provision does not apply to the extent a claim results from ToonHaus Publishing's own breach, negligence, unlawful conduct, or other liability that cannot legally be excluded."
            )
        ),
        section(
            "Suspension and Termination",
            p("Either party may terminate a project in accordance with the applicable written agreement and relevant law."),
            p(
                "ToonHaus Publishing may suspend services when reasonably necessary due to non-payment, suspected unlawful activity, material breaches of these terms, or circumstances that prevent the work from continuing lawfully or safely."
            ),
            p(
                "Upon termination, the parties will address outstanding payments, completed work, deliverables, and any eligible refunds in accordance with the applicable agreement."
            ),
            p(
                "Terms that by their nature should continue after termination, including provisions concerning intellectual property, confidentiality, outstanding payment obligations, and liability, will remain effective to the extent permitted by law."
            )
        ),
        section(
            "Privacy and Data Protection",
            link("Our collection and use of personal information are described in our", "Privacy Policy", LEGAL_ROUTES["privacy-policy"]),
            p(
                "By using our website or services, you acknowledge that personal information may be processed as described in that policy and in accordance with applicable data protection laws."
            ),
            p(
                "Please review our Privacy Policy to understand how we handle contact information, manuscripts, project files, payment-related information, and other data."
            )
        ),
        section(
            "Changes to These Terms",
            p("We may revise these Terms and Conditions to reflect changes in our services, business practices, or legal obligations."),
            p(
                "Updated terms will be published on this page with a revised effective date. Changes will apply prospectively unless otherwise required or permitted by law."
            ),
            p("Any changes to an existing project agreement will be handled in accordance with that agreement and applicable legal requirements.")
        ),
        section(
            "Governing Law and Dispute Resolution",
            p(
                "These Terms and Conditions will be governed by the laws applicable to ToonHaus Publishing's business, as specified in the relevant agreement and subject to mandatory legal protections applicable to the client."
            ),
            p(
                "If a dispute arises, the parties agree to make reasonable efforts to resolve it through good-faith communication before pursuing formal legal proceedings."
            ),
            p(
                "Any jurisdiction or dispute-resolution provision must be interpreted subject to applicable consumer protection laws and other mandatory legal requirements."
            )
        ),
        section(
            "Severability",
            p(
                "If any provision of these Terms and Conditions is found to be invalid, unlawful, or unenforceable, the remaining provisions will continue in effect to the extent permitted by law."
            ),
            p("The invalid provision will be interpreted or limited, where legally possible, to reflect its original purpose without violating applicable law.")
        ),
        section(
            "Entire Agreement",
            p(
                "These Terms and Conditions, together with the applicable quotation, project agreement, Privacy Policy, Refund Policy, and other expressly incorporated documents, govern your use of ToonHaus Publishing's website and services."
            ),
            p("They do not override any separate written agreement unless that agreement expressly provides otherwise.")
        ),
        section(
            "Contact Information",
            p(
                "If you have questions about these Terms and Conditions or require clarification about our services, payments, project agreements, or publishing arrangements, please contact us."
            ),
            contact,
            p("We will make reasonable efforts to respond to inquiries within an appropriate timeframe.")
        ),
    ],
};

/* ------------------------------------------------------------ refund policy */

const refundPolicy: LegalDocument = {
    slug: "refund-policy",
    href: LEGAL_ROUTES["refund-policy"],
    title: "Refund Policy",
    effectiveDate: "2026-10-24",
    headline: { lead: "Clear, fair refunds at ", accent: "every stage of your project" },
    summary:
        "When you can cancel, what can be refunded at each stage of a project, what can’t, and how to send us a request.",
    highlights: [
        "Full refund if you cancel before work starts",
        "Unstarted work can be refunded mid-project",
        "Third-party costs can’t be refunded once paid",
        "Requests reviewed within 10 business days",
    ],
    sections: [
        section(
            "Introduction",
            p(
                "This Refund Policy explains how ToonHaus Publishing handles cancellations and refund requests for book writing, ghostwriting, editing, proofreading, formatting, cover design, illustration, publishing, marketing, audiobook, and related services."
            ),
            p(
                "This policy forms part of our Terms and Conditions and should be read together with your quotation, package description, or project agreement. If your project agreement contains different refund terms, the project agreement will govern to the extent of that difference."
            ),
            p(
                "Nothing in this policy excludes or limits any refund, cancellation, or consumer right that cannot lawfully be excluded or limited under the laws that apply to you."
            )
        ),
        section(
            "Why Our Services Are Treated Differently",
            p(
                "Most of our services are custom creative work produced specifically for your book. Once an editor has worked on your manuscript, a designer has created your cover, or a writer has drafted your chapters, that time and work cannot be resold or recovered."
            ),
            p(
                "For this reason, refunds are based on how much of the agreed work has been performed and what external costs have already been paid, rather than on whether you are satisfied with the final commercial outcome of your book."
            )
        ),
        section(
            "Cancellation Before Work Begins",
            p(
                "If you cancel in writing after payment but before any work on your project has started, you are eligible for a full refund of the amount paid, less any non-recoverable payment processing fees charged by our payment providers."
            ),
            p(
                "Work is considered to have started once we have assigned your project to a team member and begun reviewing materials, holding a kickoff discussion, researching, drafting, editing, or designing."
            )
        ),
        section(
            "Cancellation After Work Has Started",
            p("If you cancel while a project is in progress, we will calculate any refund based on:"),
            list(
                "The services, milestones, or deliverables already completed or in progress at the time we receive your written cancellation.",
                "The proportion of the total agreed fee that relates to work not yet performed.",
                "Any third-party costs or commitments already paid or incurred on your behalf.",
                "The terms of your quotation, package, or project agreement."
            ),
            p(
                "Fees for completed milestones and work in progress are non-refundable to the extent permitted by law. Where a project is paid in milestones, each milestone payment covers the work in that stage and becomes non-refundable once that stage has begun."
            ),
            p(
                "Upon cancellation, we will provide you with the work completed up to that point once all amounts due for that work have been paid, in accordance with your project agreement."
            )
        ),
        section(
            "Approved and Delivered Work",
            p(
                "Once you approve a deliverable, such as a manuscript draft, edited chapter, interior layout, cover design, illustration, or proof, or authorize publication, the fees associated with that deliverable are non-refundable to the extent permitted by law."
            ),
            p(
                "Changes requested after approval are treated as new work and may involve additional fees, as described in our Terms and Conditions."
            )
        ),
        section(
            "Non-Refundable Items",
            p("The following are non-refundable once purchased, paid, or incurred, to the extent permitted by law:"),
            list(
                {
                    label: "Third-party costs",
                    text: "ISBNs, barcodes, copyright registration fees, printing and proof copies, shipping, stock images, fonts, and licensed assets.",
                },
                {
                    label: "Platform and distribution fees",
                    text: "Fees charged by retailers, distributors, publishing platforms, or aggregators, which are governed by those providers’ own policies.",
                },
                {
                    label: "Advertising spend",
                    text: "Budgets already spent on advertising platforms, promotional placements, or paid campaigns.",
                },
                {
                    label: "Subscriptions and tools",
                    text: "Software, hosting, or subscription costs purchased for your project.",
                },
                {
                    label: "Payment processing fees",
                    text: "Transaction fees charged by payment providers that we are unable to recover.",
                }
            )
        ),
        section(
            "Situations That Do Not Qualify for a Refund",
            p("Refunds are not available solely because of:"),
            list(
                "A third-party platform rejecting, delaying, restricting, or removing your book for reasons outside our control.",
                "Sales volume, royalties, rankings, reviews, downloads, or other commercial results falling below your expectations.",
                "Marketing or advertising results, which depend on factors outside our control as explained in our Terms and Conditions.",
                "Project delays caused by late materials, feedback, or approvals on your side.",
                "A change of mind after work has been completed or approved.",
                "Content you supplied that infringes third-party rights or violates the law, or that requires us to stop work under our Terms and Conditions."
            )
        ),
        section(
            "Quality Concerns and Revisions",
            p(
                "If you are unhappy with a deliverable, please tell us as soon as possible and before approving it. Revisions included in your package or agreement are the first way we resolve quality concerns, and we will work with you to bring the deliverable in line with the agreed brief."
            ),
            p(
                "If we are unable to deliver work that reasonably meets the agreed scope after the included revisions, you may request a review. Where we agree the work materially fails to meet the agreed scope, we may offer additional revisions, a reassignment to another team member, or a partial refund for the affected deliverable."
            )
        ),
        section(
            "Cancellation by ToonHaus Publishing",
            p(
                "If we cancel a project for reasons within our control and not caused by a breach on your side, we will refund the fees paid for work not yet performed, in addition to any other rights you may have under applicable law."
            ),
            p(
                "If we suspend or end a project because of non-payment, unlawful or infringing content, or a material breach of our Terms and Conditions, any refund will be limited to fees for work not yet performed, less costs already incurred, to the extent permitted by law."
            )
        ),
        section(
            "Inactive Projects",
            p(
                "If we do not receive materials, feedback, or approvals from you for 60 consecutive days despite reasonable attempts to contact you, we may place your project on hold or close it. Fees for work completed before the project was paused or closed remain non-refundable."
            ),
            p(
                "Closed projects can usually be reopened at your request. Reopening may require an updated timeline and, where costs have changed, an updated quotation."
            )
        ),
        section(
            "How to Request a Cancellation or Refund",
            p("Send your request in writing to the email address listed below and include:"),
            list(
                "Your full name and the email address used for your project.",
                "Your invoice number, order number, or project name.",
                "The service or deliverable your request relates to.",
                "The reason for your request and any supporting details."
            ),
            p(
                "We will acknowledge your request and review it within 10 business days. We may ask for additional information or arrange a call to understand the issue."
            )
        ),
        section(
            "Processing Approved Refunds",
            p(
                "Approved refunds are issued to the original payment method within 14 business days of approval, unless another method is agreed in writing or required by law."
            ),
            p(
                "Your bank, card issuer, or payment provider may take additional time to post the refund to your account. Refunds are made in the currency of the original payment, and we are not responsible for exchange-rate differences or fees charged by your financial institution."
            )
        ),
        section(
            "Chargebacks and Payment Disputes",
            p(
                "Please contact us before opening a chargeback or payment dispute with your bank or card issuer. Most concerns can be resolved quickly and directly through our team."
            ),
            p(
                "If a chargeback is filed, we may pause work on your project while the dispute is reviewed and will provide the payment provider with relevant project records. This does not affect any rights you have under applicable law."
            )
        ),
        section(
            "Changes to This Refund Policy",
            p(
                "We may update this Refund Policy to reflect changes in our services, business practices, or legal obligations. Updated versions will be posted on this page with a revised effective date."
            ),
            p(
                "Changes apply to purchases made after the updated policy is published. Existing projects will continue to follow the refund terms that applied when the engagement was accepted, unless otherwise agreed or required by law."
            )
        ),
        section(
            "Contact Us",
            p("If you have questions about this Refund Policy or would like to cancel a project, please contact ToonHaus Publishing."),
            contact,
            p("We will review your request and respond within the timeframes described in this policy.")
        ),
    ],
};

/* ----------------------------------------------------------------- exports */

export const LEGAL_DOCUMENTS: Record<LegalSlug, LegalDocument> = {
    "privacy-policy": privacyPolicy,
    "terms-and-conditions": termsAndConditions,
    "refund-policy": refundPolicy,
};

export const LEGAL_ORDER: LegalSlug[] = ["privacy-policy", "terms-and-conditions", "refund-policy"];

/** Rough reading time in minutes for a document. */
export function readingMinutes(doc: LegalDocument, wordsPerMinute = 220): number {
    let words = 0;
    for (const s of doc.sections) {
        for (const b of s.blocks) {
            if (b.type === "p" || b.type === "link") words += b.text.split(/\s+/).length;
            if (b.type === "list") for (const i of b.items) words += `${i.label ?? ""} ${i.text}`.split(/\s+/).length;
        }
    }
    return Math.max(1, Math.round(words / wordsPerMinute));
}