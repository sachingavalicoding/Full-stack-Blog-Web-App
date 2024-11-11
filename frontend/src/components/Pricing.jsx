
const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Access basic articles and public content.',
      features: [
        'Access to free blogs',
        'Weekly newsletter',
        'Standard support',
      ],
      buttonText: 'Subscribe Free',
    },
    {
      name: 'Starter',
      price: '$5',
      description: 'Gain access to premium content and early releases.',
      features: [
        'All free content',
        'Access to premium blogs',
        'Ad-free experience',
        'Priority support',
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'Pro',
      price: '$15',
      description: 'Full access to all content and community features.',
      features: [
        'Everything in Starter',
        'Access to exclusive articles',
        'Premium support',
        'Monthly AMA sessions',
      ],
      buttonText: 'Subscribe Now',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations needing special access.',
      features: [
        'Custom content plans',
        'Dedicated account manager',
        'Custom integrations',
        'Team-wide access',
      ],
      buttonText: 'Contact Us',
    },
  ];

  return (
    <section className="bg-gray-900 py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12 ">
          <h2 className="text-4xl font-extrabold text-white">Pricing Plans</h2>
          <p className="mt-4 text-xl text-gray-400">
            Choose a plan that fits your needs and access premium blog content.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-4 text-gray-400">{plan.description}</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                <span className="text-xl font-medium text-gray-400">{plan.price !== 'Custom' && '/mo'}</span>
              </div>
              <ul className="mb-8 space-y-4 text-gray-400">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
