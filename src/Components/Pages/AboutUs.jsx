import React from 'react';

const AboutUs = () => {
  return (
      <div className="min-h-full p-8">
        {/* Hero Section */}
        <section className="text-center px-4">
          <h1 className="text-4xl font-extrabold mb-4 text-foreground font-poppins">Student System Mangement</h1>
          <p className="text-lg max-w-xl mx-auto text-muted-foreground text-pretty">
            We are a team passionate about technology, innovation, and creating solutions that make life easier for
            everyone.
          </p>
        </section>

        {/* Info Cards */}
        <section className='w-full h-auto mt-10  '>
            <div className='w-full h-full flex flex-wrap py-10 bg-indigo-950 rounded-2xl'>
                <div className="w-full flex h-[390px] ps-10 font-siemreap">
                  {/* image */}
                  <div className="w-[35%] h-full">
                    <img
                      className="w-full h-full object-cover rounded-2xl"
                      src="https://scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/595288353_1406686281186212_6692881722306654804_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFo6xxycla0mTnns7BoglqrQO3WztFOF7FA7dbO0U4XsfcOannNCgcVlZKXiXfOO9houlmbHbRO_AEmD3RPiYQM&_nc_ohc=myfMlzieqXsQ7kNvwFyKtek&_nc_oc=AdmX57GBvdCc05pIh2pneX6yqptxBjq25xYhYCyKQWXStnPezel32KSlZ6SaUxS6UOs&_nc_zt=23&_nc_ht=scontent.fpnh18-1.fna&_nc_gid=EGS9TXSjFVlBz59Dkq5C_A&oh=00_Afl1n4By108UT6CKP07QLn67OKA7JDHRHMxuGLBqFP6sKw&oe=695495C9"
                      alt="Vanthiv profile"
                    />
                  </div>

                  {/* about me */}
                  <div className="w-[65%] h-full flex flex-col justify-center px-10 text-white">
                    <h1 className="text-lg leading-relaxed text-yellow-500 py-2 font-bold underline">បង្កើតខាង ផ្នែក Fronted System</h1>
                    <p className="text-lg leading-relaxed">
                      សួស្តី! ខ្ញុំបាទឈ្មោះ <span className="font-semibold">ហុក វ៉ាន់ធីវ ( HOK VANTHIV ) </span> 
                      ជានិស្សិតឆ្នាំទី ៣ នៃសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ និងជាគ្រូបង្រៀននៅ ETEC Center -មជ្ឈមណ្ឌលបណ្តុះជំនាញ I.T ។ ខ្ញុំមានចំណង់ចំណូលចិត្តខ្លាំងក្នុងការអភិវឌ្ឍគេហទំព័រ
                      ទាំងផ្នែកមុខ (Frontend) និងផ្នែកក្រោយ (Backend)។
                    </p>

                    <p className="text-lg leading-relaxed mt-4">
                      នៅផ្នែក <span className="font-semibold text-yellow-300">Frontend</span> ខ្ញុំមានជំនាញលើ 
                      HTML, CSS, JavaScript, Bootstrap, Tailwind CSS , Jquery , ReactJS និង Vuejs។
                      ខ្ញុំចូលចិត្តបង្កើត UI ដែលស្អាត មានប្រតិបត្តិការលឿន និងងាយស្រួលប្រើ។
                    </p>

                    <p className="text-lg leading-relaxed mt-4">
                      ចំពោះផ្នែក <span className="font-semibold text-yellow-300">Backend</span> ខ្ញុំមានបទពិសោធន៍
                      ជាមួយ PHP, MySQL និង Laravel។ ខ្ញុំចូលចិត្តការរចនាប្រព័ន្ធទិន្នន័យ
                      និងការរួមបញ្ចូល API ដើម្បីធ្វើឲ្យគេហទំព័រមានប្រសិទ្ធភាពខ្ពស់។
                    </p>

                    <p className="text-lg leading-relaxed mt-4">
                      គោលបំណងរបស់ខ្ញុំគឺក្លាយជា <span className="font-semibold text-yellow-300">Full-Stack Developer </span>
                      ដែលអាចបង្កើតគេហទំព័រដែលមានគុណភាព និងឆ្លើយតបតាមតម្រូវការរបស់អតិថិជន។
                    </p>
                  </div>
                </div>    
            </div>
            <div className='w-full h-full flex mt-10  py-10 bg-indigo-950 rounded-2xl'>
                <div className="w-full flex flex-row-reverse h-[390px] font-siemreap">
                  {/* image */}
                  <div className="w-[35%] h-full pr-10">
                    <img
                      className="w-full h-full object-cover rounded-2xl"
                      src="https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/539253782_1295511718736060_369277209905771653_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHutvNSEKgu-hiVYg2aZV3BL4szpWOdPywvizOlY50_LLXRUVACV4ODur9lPR-HQurx91INfI29Kqhc2YXAH5W3&_nc_ohc=lKsNoY42cycQ7kNvwHkjOZS&_nc_oc=AdkjgznTJbdBM9LQfWQhjA1xSIYGSViVqaBJ1TIr3DBPXhGNOwR4-ddmamVzNfpF0mU&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&_nc_gid=RTGH79b1JTph5wtGBJCUPg&oh=00_AfmLy8ij6FMlsErp-7xJdw1ERQFGESy_33A-ShbPHhSuLQ&oe=6954A9A0"
                      alt="Vanthiv profile"
                    />
                  </div>

                  {/* about me */}
                  <div className="w-[65%] h-full flex flex-col justify-center px-10 text-white">
                     <h1 className="text-lg leading-relaxed text-yellow-500 py-2 font-bold underline">បង្កើតខាង ផ្នែក Backend System</h1>
                    <p className="text-lg leading-relaxed">
                      សួស្តី! ខ្ញុំបាទឈ្មោះ <span className="font-semibold">ជីវ័ន ( CHIVORN ) </span> 
                      ជានិស្សិតឆ្នាំទី ៣ នៃសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ និងជាគ្រូបង្រៀននៅ ETEC Center -មជ្ឈមណ្ឌលបណ្តុះជំនាញ I.T ។ ខ្ញុំមានចំណង់ចំណូលចិត្តខ្លាំងក្នុងការអភិវឌ្ឍគេហទំព័រ
                      ទាំងផ្នែកមុខ (Frontend) និងផ្នែកក្រោយ (Backend)។
                    </p>

                    <p className="text-lg leading-relaxed mt-4">
                      នៅផ្នែក <span className="font-semibold text-yellow-300">Frontend</span> ខ្ញុំមានជំនាញលើ 
                      HTML, CSS, JavaScript, Bootstrap, Tailwind CSS , Jquery , ReactJS និង Vuejs។
                      ខ្ញុំចូលចិត្តបង្កើត UI ដែលស្អាត មានប្រតិបត្តិការលឿន និងងាយស្រួលប្រើ។
                    </p>

                    <p className="text-lg leading-relaxed mt-4">
                      ចំពោះផ្នែក <span className="font-semibold text-yellow-300">Backend</span> ខ្ញុំមានបទពិសោធន៍
                      ជាមួយ PHP, MySQL និង Laravel។ ខ្ញុំចូលចិត្តការរចនាប្រព័ន្ធទិន្នន័យ
                      និងការរួមបញ្ចូល API ដើម្បីធ្វើឲ្យគេហទំព័រមានប្រសិទ្ធភាពខ្ពស់។
                    </p>

                    <p className="text-lg leading-relaxed mt-4">
                      គោលបំណងរបស់ខ្ញុំគឺក្លាយជា <span className="font-semibold text-yellow-300">Full-Stack Developer </span>
                      ដែលអាចបង្កើតគេហទំព័រដែលមានគុណភាព និងឆ្លើយតបតាមតម្រូវការរបស់អតិថិជន។
                    </p>
                  </div>
                </div>    
            </div>
        </section>
        
      </div>
  );
};

export default AboutUs;
