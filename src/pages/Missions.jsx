import React from 'react';

export default function Missions() {
  return (
    <div>



      <main>

        <section className="relative min-h-[819px] flex items-center overflow-hidden bg-black py-24">
          <div className="absolute inset-0">
            <img alt="Missions Background" className="w-full h-full object-cover" src="/Images/3.png" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-8 w-full z-10">
            <div className="max-w-3xl">
              <span className="font-label text-secondary-container uppercase tracking-widest text-sm font-bold mb-4 block">DIPLOMACY • HUMANITY • JUSTICE</span>
              <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Our Missions <div>for a </div> <span className="text-secondary-container">Just Society</span>
              </h1>
              <p className="text-white/80 text-xl font-body max-w-2xl mb-10 leading-relaxed">
                Guided by the values of Dr. Dyaneshawar Mulay, we bridge the gap between global diplomatic vision and local social action to empower every citizen.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-secondary-container text-on-secondary-container px-8 py-4 font-bold rounded-md hover:shadow-xl transition-all">Participate in Change</button>
                <button className="border border-white/30 text-white px-8 py-4 font-bold rounded-md hover:bg-white/10 transition-all backdrop-blur-sm">Download Charter</button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-2 block">FOUNDATIONAL PRINCIPLES</span>
              <h2 className="text-4xl font-extrabold text-primary mb-4">Core Mission Pillars</h2>
              <div className="w-24 h-1 bg-secondary-container"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              <div className="relative group bg-surface-container-low p-8 border-l-4 border-primary">
                <div className="mb-6">
                  <span className="material-symbols-outlined text-5xl text-primary" data-icon="gavel">gavel</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Justice</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Ensuring fair legal representation and social equity for marginalized communities. We work to dismantle systemic barriers through legal aid and awareness initiatives.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm font-medium text-primary">
                    <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> Legal Aid Clinics
                  </li>
                  <li className="flex items-center gap-2 text-sm font-medium text-primary">
                    <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> Rights Advocacy
                  </li>
                </ul>
              </div>

              <div className="relative group bg-surface-container-low p-8 border-l-4 border-secondary-container">
                <div className="mb-6">
                  <span className="material-symbols-outlined text-5xl text-secondary" data-icon="auto_awesome">auto_awesome</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Liberty</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Promoting freedom of expression and intellectual growth. We believe liberty is the bedrock of progress and foster environments where diverse voices can flourish.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm font-medium text-primary">
                    <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> Creative Platforms
                  </li>
                  <li className="flex items-center gap-2 text-sm font-medium text-primary">
                    <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> Free Press Support
                  </li>
                </ul>
              </div>

              <div className="relative group bg-surface-container-low p-8 border-l-4 border-on-tertiary-container">
                <div className="mb-6">
                  <span className="material-symbols-outlined text-5xl text-on-tertiary-container" data-icon="balance">balance</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Equality</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Leveling the playing field through education and economic empowerment. Our programs target the roots of inequality to create sustainable generational change.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm font-medium text-primary">
                    <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> Merit Scholarships
                  </li>
                  <li className="flex items-center gap-2 text-sm font-medium text-primary">
                    <span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> Skill Development
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface-container overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2 relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 border-[12px] border-white shadow-2xl">
                  <img alt="" className="w-full aspect-[4/5] object-cover" data-alt="candid shot of a diverse group of professionals in a boardroom meeting discussing policy documents in a bright airy office" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhL1Jt19Ln3KhgHjSa8pUNnJ1oxLDJKnFfUYNJZb_-cRukPN2MfI4nKUnQdZgZayUJ8jVpsO6z9hbUCAvvlHf8eEhqtVFLgjLiIn5dKjxGBUC2iM1sLVwWj_V6wtXs-XX9zFTC0OQIAHoFifUJUKi6zjPTVlGDKOXvVFcVltoXKtdIsGXWQpsit0v9uV8dIc2WQOfJ5wRa7Ob5tS87zEdCPPm1LXMHMUHu9CnvlNQv3oPlAV1Y1Ui2_n2QFs5Cvey6W-Dd85r-7-75" />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 max-w-xs shadow-xl">
                  <p className="font-headline italic text-lg leading-relaxed">"Diplomacy is not just for cabinets, it is for the people."</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-secondary-container">— Dr. Dyaneshawar Mulay</p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-2 block">STRATEGIC FRAMEWORK</span>
                <h2 className="text-4xl font-extrabold text-primary mb-8 leading-tight">The Path to Impact</h2>
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-white flex items-center justify-center rounded-md">1</div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">Diplomatic Discourse</h4>
                      <p className="text-on-surface-variant">Utilizing international relations and high-level dialogue to influence policy and secure resources for social upliftment.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary-container text-on-secondary-container flex items-center justify-center rounded-md">2</div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">Community Engagement</h4>
                      <p className="text-on-surface-variant">Working directly with grassroots leaders to implement solutions that are culturally relevant and sustainably managed.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-on-tertiary-container text-white flex items-center justify-center rounded-md">3</div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">Policy Advocacy</h4>
                      <p className="text-on-surface-variant">Bridging the gap between lived experience and legislative action by presenting data-driven research to government bodies.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 relative overflow-hidden bg-[#00003c]">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="grid grid-cols-6 h-full w-full">
              <div className="border-r border-white/20"></div>
              <div className="border-r border-white/20"></div>
              <div className="border-r border-white/20"></div>
              <div className="border-r border-white/20"></div>
              <div className="border-r border-white/20"></div>
              <div></div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-8">Join the Movement for Change</h2>
            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
              Your contribution, whether through time, resources, or advocacy, helps us build a society that mirrors our highest ideals of justice and liberty.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a className="w-full sm:w-auto bg-secondary-container text-on-secondary-container px-10 py-5 font-bold rounded-md hover:shadow-[0_0_30px_rgba(254,152,50,0.4)] transition-all" href="#">Become a Volunteer</a>
              <a className="w-full sm:w-auto border border-white/30 text-white px-10 py-5 font-bold rounded-md hover:bg-white/5 transition-all" href="#">Support Our Missions</a>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
