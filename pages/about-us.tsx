import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-10">
      <div className="container mx-auto bg-white p-8 border rounded-md shadow-lg max-w-2xl space-y-6">
        
        <h1 className="text-4xl font-bold text-center mb-8">About us</h1>

        <div className="space-y-6">
          
          <div>
            <h3 className="text-2xl font-semibold mb-4">What is HackerGPT?</h3>
            <p className="text-lg">HackerGPT is your intelligent robot assistant, specialized for ethical hackers. Built on an extensive dataset of hacking resources, including detailed guides, hacking write-ups and bug bounty reports, we continuously evolve and enhance its capabilities.</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">How does HackerGPT work?</h3>
            <p className="text-lg mb-4">When you ask a question, it&apos;s sent to our server. 
            We verify user authenticity and manage the number of questions you can submit based on your user type (free or plus). 
            Our next step is to search our database for information closely matching your question.
            If we find a strong match, we incorporate this into the AI&apos;s response process. Finally, your question is securely passed to 
            either Google or OpenAI for processing. Importantly, we only send the question and previous ones from the same chat without
            any personal information. The response you receive varies based on the selected module:</p>
            <ul className="list-disc ml-8 space-y-2">
              <li>HackerGPT: A tuned version of Palm 2 with semantic search on our data.</li>
              <li>GPT-4: Advanced GPT 4 paired with our unique prompt.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Is my information safe?</h3>
            <p className="text-lg mb-4">Yes! We care about your privacy a lot:</p>
            <ul className="list-disc ml-8 space-y-2">
              <li>Simple email sign-in.</li>
              <li>Your questions aren&apos;t logged by us.</li>
              <li>Chats are device-exclusive; we don&apos;t store them.</li>
              <li>Google and OpenAI doesn&apos;t know who&apos;s asking.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Need help or have questions?</h3>
            <p className="text-lg">We&apos;re here for you. Get in touch for any help, questions, or feedback at <a className="text-blue-500 hover:underline hover:text-blue-600" href="mailto:contact@hackergpt.chat">contact@hackergpt.chat</a></p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutUs;
