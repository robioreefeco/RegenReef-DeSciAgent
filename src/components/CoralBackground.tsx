import React from 'react';

export const CoralBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Psychedelic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 via-cyan-50 via-yellow-50 to-orange-100">
        
        {/* Bottom Layer - Realistic Coral Formations */}
        <svg className="absolute bottom-0 left-0 w-full h-80 opacity-70" viewBox="0 0 1200 400" fill="none">
          {/* Massive Brain Coral (Diploria labyrinthiformis) */}
          <g className="coral-sway">
            <path d="M80,350 Q100,280 120,350 Q140,280 160,350 Q180,280 200,350 Q220,280 240,350 Q260,280 280,350 L280,400 L80,400 Z" 
                  fill="url(#brainCoral)" />
            <path d="M90,340 Q110,320 130,340 Q150,320 170,340 Q190,320 210,340 Q230,320 250,340 Q270,320 290,340" 
                  stroke="#FF6B9D" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M85,355 Q105,335 125,355 Q145,335 165,355 Q185,335 205,355 Q225,335 245,355 Q265,335 285,355" 
                  stroke="#FF1493" strokeWidth="2" fill="none" opacity="0.6" />
          </g>
          
          {/* Elkhorn Coral (Acropora palmata) */}
          <g className="gentle-wave">
            <path d="M400,400 L415,250 L430,220 M415,280 L450,270 L465,250 M415,320 L380,310 L365,290" 
                  stroke="url(#elkhornGradient)" strokeWidth="12" fill="none" />
            <path d="M450,400 L465,240 L480,210 M465,270 L500,260 L515,240 M465,310 L430,300 L415,280" 
                  stroke="url(#elkhornGradient)" strokeWidth="10" fill="none" />
            <circle cx="430" cy="220" r="8" fill="#FF4500" />
            <circle cx="480" cy="210" r="6" fill="#FF6347" />
          </g>
          
          {/* Massive Table Coral (Acropora hyacinthus) */}
          <ellipse cx="650" cy="320" rx="120" ry="25" fill="url(#tableCoral)" className="gentle-wave" />
          <ellipse cx="650" cy="315" rx="115" ry="20" fill="#00CED1" opacity="0.8" />
          <rect x="630" y="320" width="40" height="80" fill="url(#coralStem)" />
          
          {/* Sea Fan (Gorgonia ventalina) */}
          <g className="coral-sway" style={{transformOrigin: '850px 400px'}}>
            <path d="M850,400 Q870,350 890,400 Q910,350 930,400 Q950,350 970,400 Q990,350 1010,400" 
                  stroke="url(#seaFanGradient)" strokeWidth="6" fill="none" />
            <path d="M860,400 Q875,360 890,400 Q905,360 920,400 Q935,360 950,400 Q965,360 980,400" 
                  stroke="#FF69B4" strokeWidth="4" fill="none" opacity="0.8" />
            <path d="M870,400 Q880,370 890,400 Q900,370 910,400 Q920,370 930,400" 
                  stroke="#FF1493" strokeWidth="3" fill="none" opacity="0.6" />
          </g>
          
          {/* Tube Sponges (Aplysina fistularis) */}
          <g>
            <ellipse cx="1100" cy="350" rx="15" ry="50" fill="url(#tubeSponge1)" className="coral-sway" />
            <ellipse cx="1130" cy="340" rx="18" ry="60" fill="url(#tubeSponge2)" className="coral-sway" style={{animationDelay: '1s'}} />
            <ellipse cx="1160" cy="360" rx="12" ry="40" fill="url(#tubeSponge3)" className="coral-sway" style={{animationDelay: '2s'}} />
          </g>
          
          {/* Gradients for realistic coral colors */}
          <defs>
            <linearGradient id="brainCoral" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B9D" />
              <stop offset="50%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#8B008B" />
            </linearGradient>
            <linearGradient id="elkhornGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4500" />
              <stop offset="50%" stopColor="#FF6347" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
            <linearGradient id="tableCoral" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" />
              <stop offset="50%" stopColor="#00CED1" />
              <stop offset="100%" stopColor="#4169E1" />
            </linearGradient>
            <linearGradient id="coralStem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#32CD32" />
              <stop offset="100%" stopColor="#228B22" />
            </linearGradient>
            <linearGradient id="seaFanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF69B4" />
              <stop offset="50%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#8B008B" />
            </linearGradient>
            <linearGradient id="tubeSponge1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9370DB" />
              <stop offset="100%" stopColor="#4B0082" />
            </linearGradient>
            <linearGradient id="tubeSponge2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4500" />
              <stop offset="100%" stopColor="#FF6347" />
            </linearGradient>
            <linearGradient id="tubeSponge3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
          </defs>
        </svg>

        {/* Mid-level Marine Life */}
        <svg className="absolute bottom-20 right-0 w-full h-60 opacity-60" viewBox="0 0 1200 300" fill="none">
          {/* Soft Corals (Sinularia) */}
          <g className="coral-sway">
            <path d="M100,250 Q120,180 140,250 Q160,180 180,250 Q200,180 220,250" 
                  stroke="url(#softCoralGradient)" strokeWidth="20" fill="none" />
            <circle cx="130" cy="200" r="12" fill="#FF69B4" opacity="0.8" />
            <circle cx="170" cy="190" r="10" fill="#FF1493" opacity="0.8" />
            <circle cx="210" cy="205" r="8" fill="#8B008B" opacity="0.8" />
          </g>
          
          {/* Sea Anemones (Condylactis gigantea) */}
          <g>
            <circle cx="400" cy="220" r="25" fill="url(#anemoneBase)" />
            <g className="gentle-wave">
              {[...Array(16)].map((_, i) => (
                <path key={i}
                      d={`M400,220 Q${400 + 30 * Math.cos(i * Math.PI / 8)},${220 + 30 * Math.sin(i * Math.PI / 8)} ${400 + 45 * Math.cos(i * Math.PI / 8)},${220 + 45 * Math.sin(i * Math.PI / 8)}`}
                      stroke="url(#anemoneTentacle)" strokeWidth="4" fill="none" />
              ))}
            </g>
          </g>
          
          <g>
            <circle cx="700" cy="240" r="20" fill="url(#anemoneBase2)" />
            <g className="gentle-wave" style={{animationDelay: '1s'}}>
              {[...Array(12)].map((_, i) => (
                <path key={i}
                      d={`M700,240 Q${700 + 25 * Math.cos(i * Math.PI / 6)},${240 + 25 * Math.sin(i * Math.PI / 6)} ${700 + 35 * Math.cos(i * Math.PI / 6)},${240 + 35 * Math.sin(i * Math.PI / 6)}`}
                      stroke="url(#anemoneTentacle2)" strokeWidth="3" fill="none" />
              ))}
            </g>
          </g>
          
          {/* Barrel Sponge (Xestospongia muta) */}
          <ellipse cx="950" cy="230" rx="30" ry="70" fill="url(#barrelSponge)" className="gentle-wave" />
          <ellipse cx="950" cy="200" rx="25" ry="15" fill="none" stroke="#8B4513" strokeWidth="3" />
          
          <defs>
            <linearGradient id="softCoralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF69B4" />
              <stop offset="50%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#8B008B" />
            </linearGradient>
            <radialGradient id="anemoneBase" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#32CD32" />
              <stop offset="100%" stopColor="#228B22" />
            </radialGradient>
            <radialGradient id="anemoneBase2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4500" />
              <stop offset="100%" stopColor="#FF6347" />
            </radialGradient>
            <linearGradient id="anemoneTentacle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#32CD32" />
              <stop offset="100%" stopColor="#00FF00" />
            </linearGradient>
            <linearGradient id="anemoneTentacle2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4500" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
            <linearGradient id="barrelSponge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="50%" stopColor="#A0522D" />
              <stop offset="100%" stopColor="#D2691E" />
            </linearGradient>
          </defs>
        </svg>

        {/* Realistic Tropical Fish with Psychedelic Colors */}
        
        {/* Queen Angelfish (Holacanthus ciliaris) */}
        <div className="absolute top-1/4 left-1/6 fish-swim" style={{animationDuration: '8s', animationDelay: '0s'}}>
          <svg width="60" height="45" viewBox="0 0 60 45">
            <defs>
              <linearGradient id="angelfishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="30%" stopColor="#FF69B4" />
                <stop offset="70%" stopColor="#00FFFF" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
            </defs>
            <path d="M10,22 Q25,8 40,22 Q25,36 10,22 Z" fill="url(#angelfishGradient)" />
            <path d="M40,22 L55,15 L55,29 Z" fill="url(#angelfishGradient)" />
            <path d="M25,8 L30,2 L35,8" fill="#FF1493" />
            <path d="M25,36 L30,42 L35,36" fill="#FF1493" />
            <circle cx="35" cy="20" r="3" fill="black" />
            <circle cx="36" cy="19" r="1" fill="white" />
            <path d="M15,22 Q20,15 25,22 Q20,29 15,22" fill="none" stroke="#FF4500" strokeWidth="2" />
          </svg>
        </div>

        {/* Blue Tang (Paracanthurus hepatus) */}
        <div className="absolute top-1/3 right-1/4 fish-swim" style={{animationDuration: '6s', animationDelay: '2s'}}>
          <svg width="50" height="30" viewBox="0 0 50 30">
            <defs>
              <linearGradient id="tangGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00BFFF" />
                <stop offset="50%" stopColor="#0000FF" />
                <stop offset="100%" stopColor="#8A2BE2" />
              </linearGradient>
            </defs>
            <ellipse cx="25" cy="15" rx="18" ry="10" fill="url(#tangGradient)" />
            <path d="M43,15 L50,10 L50,20 Z" fill="url(#tangGradient)" />
            <circle cx="35" cy="12" r="2" fill="black" />
            <circle cx="36" cy="11" r="0.5" fill="white" />
            <path d="M7,15 Q12,10 17,15 Q12,20 7,15" fill="none" stroke="#FFD700" strokeWidth="2" />
            <path d="M20,8 Q25,5 30,8" stroke="#FF69B4" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Mandarin Fish (Synchiropus splendidus) */}
        <div className="absolute top-1/2 left-1/3 fish-swim" style={{animationDuration: '7s', animationDelay: '1s'}}>
          <svg width="40" height="25" viewBox="0 0 40 25">
            <defs>
              <radialGradient id="mandarinGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF4500" />
                <stop offset="30%" stopColor="#FF69B4" />
                <stop offset="60%" stopColor="#00FFFF" />
                <stop offset="100%" stopColor="#9370DB" />
              </radialGradient>
            </defs>
            <ellipse cx="20" cy="12" rx="15" ry="8" fill="url(#mandarinGradient)" />
            <path d="M35,12 L40,9 L40,15 Z" fill="url(#mandarinGradient)" />
            <circle cx="28" cy="10" r="1.5" fill="black" />
            <path d="M8,12 Q12,8 16,12 Q12,16 8,12" fill="none" stroke="#FFD700" strokeWidth="1.5" />
            <circle cx="15" cy="8" r="2" fill="#FF1493" opacity="0.8" />
            <circle cx="25" cy="16" r="1.5" fill="#00FFFF" opacity="0.8" />
            <circle cx="18" cy="15" r="1" fill="#FFD700" opacity="0.8" />
          </svg>
        </div>

        {/* Parrotfish (Scarus) */}
        <div className="absolute bottom-1/3 right-1/6 fish-swim" style={{animationDuration: '9s', animationDelay: '3s'}}>
          <svg width="70" height="40" viewBox="0 0 70 40">
            <defs>
              <linearGradient id="parrotfishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#32CD32" />
                <stop offset="25%" stopColor="#00FFFF" />
                <stop offset="50%" stopColor="#FF69B4" />
                <stop offset="75%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#9370DB" />
              </linearGradient>
            </defs>
            <path d="M10,20 Q30,8 50,20 Q30,32 10,20 Z" fill="url(#parrotfishGradient)" />
            <path d="M50,20 L65,15 L65,25 Z" fill="url(#parrotfishGradient)" />
            <circle cx="40" cy="17" r="3" fill="black" />
            <circle cx="41" cy="16" r="1" fill="white" />
            <path d="M15,20 Q22,14 29,20 Q22,26 15,20" fill="none" stroke="#FF4500" strokeWidth="2" />
            <rect x="5" y="18" width="8" height="4" rx="2" fill="#FF1493" />
          </svg>
        </div>

        {/* School of Chromis (Chromis cyanea) */}
        <div className="absolute top-1/5 right-1/3 flex space-x-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="fish-swim" style={{animationDelay: `${i * 0.3}s`, animationDuration: '5s'}}>
              <svg width="20" height="15" viewBox="0 0 20 15">
                <defs>
                  <linearGradient id={`chromisGradient${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00BFFF" />
                    <stop offset="50%" stopColor="#FF69B4" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                <ellipse cx="10" cy="7" rx="7" ry="4" fill={`url(#chromisGradient${i})`} />
                <path d="M17,7 L20,5 L20,9 Z" fill={`url(#chromisGradient${i})`} />
                <circle cx="14" cy="6" r="1" fill="black" />
              </svg>
            </div>
          ))}
        </div>

        {/* Psychedelic Floating Particles */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-70 bubble-float"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 bubble-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-50 bubble-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-80 bubble-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-2/3 left-1/5 w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-60 bubble-float" style={{animationDelay: '1.5s'}}></div>

        {/* Bioluminescent Plankton Effect */}
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-cyan-300 rounded-full opacity-90 animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-lime-300 rounded-full opacity-80 animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-300 rounded-full opacity-70 animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 right-1/5 w-2 h-2 bg-purple-300 rounded-full opacity-85 animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/6 left-2/3 w-1 h-1 bg-pink-300 rounded-full opacity-75 animate-ping" style={{animationDelay: '1.8s'}}></div>

        {/* Realistic Seaweed (Macroalgae) */}
        <svg className="absolute bottom-0 left-1/4 w-20 h-40 opacity-60" viewBox="0 0 20 40">
          <defs>
            <linearGradient id="seaweedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#32CD32" />
              <stop offset="50%" stopColor="#228B22" />
              <stop offset="100%" stopColor="#006400" />
            </linearGradient>
          </defs>
          <path d="M10,40 Q8,32 10,24 Q12,16 10,8 Q8,4 10,0" stroke="url(#seaweedGradient)" strokeWidth="4" fill="none" className="coral-sway" />
          <path d="M10,30 Q14,28 12,24" stroke="url(#seaweedGradient)" strokeWidth="3" fill="none" />
          <path d="M10,20 Q6,18 8,14" stroke="url(#seaweedGradient)" strokeWidth="3" fill="none" />
          <path d="M10,35 Q15,33 13,29" stroke="url(#seaweedGradient)" strokeWidth="2" fill="none" />
        </svg>

        <svg className="absolute bottom-0 right-1/3 w-16 h-35 opacity-50" viewBox="0 0 16 35">
          <path d="M8,35 Q6,28 8,21 Q10,14 8,7 Q6,3 8,0" stroke="url(#seaweedGradient)" strokeWidth="3" fill="none" className="coral-sway" style={{animationDelay: '1.5s'}} />
          <path d="M8,25 Q12,23 10,19" stroke="url(#seaweedGradient)" strokeWidth="2" fill="none" />
          <path d="M8,15 Q4,13 6,9" stroke="url(#seaweedGradient)" strokeWidth="2" fill="none" />
        </svg>

        {/* Crown-of-Thorns Starfish (Acanthaster planci) */}
        <svg className="absolute bottom-8 right-1/4 w-16 h-16 opacity-70" viewBox="0 0 32 32">
          <defs>
            <radialGradient id="starfishGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4500" />
              <stop offset="50%" stopColor="#FF6347" />
              <stop offset="100%" stopColor="#8B0000" />
            </radialGradient>
          </defs>
          <path d="M16,4 L18,12 L26,12 L20,18 L22,26 L16,20 L10,26 L12,18 L6,12 L14,12 Z" fill="url(#starfishGradient)" />
          <circle cx="16" cy="16" r="4" fill="#8B0000" />
          {[...Array(20)].map((_, i) => (
            <line key={i}
                  x1="16" y1="16" 
                  x2={16 + 8 * Math.cos(i * Math.PI / 10)} 
                  y2={16 + 8 * Math.sin(i * Math.PI / 10)}
                  stroke="#FF1493" strokeWidth="1" opacity="0.8" />
          ))}
        </svg>

        {/* Sea Urchin (Diadema antillarum) */}
        <svg className="absolute bottom-4 left-3/4 w-12 h-12 opacity-60" viewBox="0 0 24 24">
          <defs>
            <radialGradient id="urchinGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4B0082" />
              <stop offset="100%" stopColor="#8B008B" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="6" fill="url(#urchinGradient)" />
          {[...Array(24)].map((_, i) => (
            <line key={i}
                  x1="12" y1="12" 
                  x2={12 + 10 * Math.cos(i * Math.PI / 12)} 
                  y2={12 + 10 * Math.sin(i * Math.PI / 12)}
                  stroke="#9370DB" strokeWidth="1" />
          ))}
        </svg>

        {/* Giant Clam (Tridacna gigas) */}
        <svg className="absolute bottom-12 left-1/2 w-24 h-16 opacity-65" viewBox="0 0 48 32">
          <defs>
            <linearGradient id="clamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF69B4" />
              <stop offset="50%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#8B008B" />
            </linearGradient>
          </defs>
          <ellipse cx="24" cy="24" rx="20" ry="8" fill="url(#clamGradient)" />
          <path d="M4,24 Q24,8 44,24" stroke="#FF1493" strokeWidth="3" fill="none" />
          <path d="M8,24 Q24,12 40,24" stroke="#FFD700" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
};