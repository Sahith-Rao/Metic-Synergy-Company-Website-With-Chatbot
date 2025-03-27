import React from 'react';

const ClientMarquee: React.FC = () => {
  const clients = [
    { name: "Figuring Out By Jay", logo: "/FIGURING OUT BY JAY (1).png" },
    { name: "Ravrani Developers", logo: "/ravrani.png.jpg" },
    { name: "Futbol X Decathlon", logo: "/futbol.png" },
    { name: "Sphoorthy Restaurant", logo: "/SPHOORTHY (1).jpg" },
    
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-gray-300/10 animate-gradient"></div>
        <div className="absolute top-1/2 left-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white">
          Our Trusted Partners
        </h2>

        <div className="relative">
          
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10"></div>

          
          <div className="overflow-hidden relative">
            
            <div className="flex space-x-12 animate-marquee whitespace-nowrap">
              {clients.map((client, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-none w-48 h-32 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-300/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative h-full bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-white/50 
                               p-4 transform hover:scale-105 transition-all duration-500
                               hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
              
              {clients.map((client, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-none w-48 h-32 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-300/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative h-full bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-white/50 
                               p-4 transform hover:scale-105 transition-all duration-500
                               hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default ClientMarquee;
