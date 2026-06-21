'use client'

import { motion } from 'framer-motion'
import { Eye, Target, Building, Users, Award, ExternalLink, MapPin } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const departments = [
  { name: 'Computer Science & Engineering', code: 'CSE', desc: 'Cutting-edge curriculum in algorithms, AI, and software engineering.' },
  { name: 'Information Technology', code: 'IT', desc: 'Focus on web, cloud, and modern application development.' },
  { name: 'Electronics & Communication', code: 'ECE', desc: 'Advanced studies in VLSI, embedded systems, and IoT.' },
  { name: 'Electrical & Electronics', code: 'EEE', desc: 'Power systems, control systems, and renewable energy.' },
  { name: 'Mechanical Engineering', code: 'MECH', desc: 'Design, manufacturing, robotics, and thermodynamics.' },
  { name: 'Civil Engineering', code: 'CIVIL', desc: 'Structural engineering, construction, and urban planning.' },
]

const facilities = [
  { name: 'Central Library', desc: '50,000+ volumes, digital library, and 24/7 study spaces.' },
  { name: 'Innovation Labs', desc: 'Dedicated maker-spaces with 3D printers, IoT kits, and robotics equipment.' },
  { name: 'Sports Complex', desc: 'Cricket, football, basketball, indoor games, and a modern gymnasium.' },
  { name: 'Hostels', desc: 'Separate hostels for boys and girls with high-speed Wi-Fi and mess facilities.' },
  { name: 'Auditorium', desc: '500-seat air-conditioned auditorium for events and conferences.' },
  { name: 'Transport', desc: '50+ buses covering all major routes across Hyderabad.' },
]

const achievements = [
  'NBA Accreditation for CSE, ECE, and MECH departments',
  'Ranked among top 10 engineering colleges in Telangana',
  '95% placement record with 200+ recruiters annually',
  'Smart India Hackathon winners for 3 consecutive years',
  'Research funding from AICTE, DST, and DRDO',
  'Collaborations with 20+ international universities',
]

const galleryImages = [
  'https://cache.careers360.mobi/media/colleges/reviews/88946abd926b95241692b084b03ac8ec.jpg',
  'https://image-static.collegedunia.com/public/reviewPhotos/1046236/1000030510.png',
  'https://intellipaat.com/course-image/2025/05/Guru-Nanak-University-Video-Image.jpg',
  'https://image-static.collegedunia.com/public/reviewPhotos/1087082/inbound7625886127469106040.jpg',
  'https://images.shiksha.com/mediadata/images/1626695443phppjGnqq.jpeg',
  'https://image3.mouthshut.com/images/imagesp/925968603s.png',

]

export function AboutGnitPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-red-900/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider rounded-full border border-primary/30 text-primary bg-primary/5">
              Our Institution
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About <span className="gradient-text">GNIT</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Guru Nanak Institute of Technology — a premier institution committed to academic excellence, innovation, and holistic student development since 2001. Home to the Department of Computer Science & Engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader eyebrow="Overview" title="College Overview" center={false} />
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Guru Nanak Institute of Technology (GNIT) is an autonomous institution affiliated to Jawaharlal Nehru Technological University, Hyderabad (JNTUH). Established in 2001 by the Guru Nanak Educational Society under the leadership of Dr. H. S. Saini, GNIT has emerged as one of the most sought-after technical institutions in Telangana.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Spread across a sprawling 25-acre campus in Ibrahimpatnam, Hyderabad, the institute offers undergraduate and postgraduate programs in engineering, technology, and management. With state-of-the-art infrastructure, highly qualified faculty, and industry-aligned curriculum, GNIT has consistently maintained an exceptional placement record and academic reputation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The institution is accredited by NBA and NAAC, and recognized by UGC under Section 2(f). It is committed to nurturing not just engineers, but responsible global citizens who can lead technological innovation with ethical awareness.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              { }
              <img src="https://image-static.collegedunia.com/public/reviewPhotos/1046236/1000030510.png" alt="GNIT Campus" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glass-card border-primary/20">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl gradient-bg-green-red flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be a globally recognized institution of excellence in technical education, producing innovative, ethical, and socially responsible engineers who can address the complex challenges of a rapidly evolving technological landscape and contribute meaningfully to nation-building.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full glass-card border-primary/20">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl gradient-bg-green-red flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Mission</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {[
                      'To impart quality technical education with a strong foundation in fundamentals.',
                      'To foster a culture of research, innovation, and entrepreneurship.',
                      'To develop industry-ready professionals through hands-on learning and internships.',
                      'To inculcate ethical values, leadership, and a spirit of social responsibility.',
                      'To build strong industry-academia partnerships for mutual growth.',
                    ].map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">▹</span>
                        <span className="leading-relaxed">{m}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Academics" title="Departments" subtitle="Six engineering departments offering world-class undergraduate and postgraduate programs." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((d, i) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <Card className="glass-card h-full group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-sm group-hover:gradient-bg-green-red group-hover:text-white transition-all">
                        {d.code}
                      </div>
                      <Building className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1.5 leading-tight">{d.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Infrastructure" title="Campus Facilities" subtitle="World-class infrastructure designed to support learning, innovation, and overall well-being." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="glass-card rounded-2xl p-5"
              >
                <h3 className="font-semibold mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full gradient-bg-green-red" />
                  {f.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Campus Life" title="Campus Gallery" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-xl group ${i % 5 === 0 ? 'md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
              >
                { }
                <img src={url} alt={`Campus ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Recognition" title="College Achievements" />
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 glass-card rounded-xl p-4"
              >
                <div className="w-9 h-9 rounded-lg gradient-bg-green-red flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm leading-relaxed pt-1">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + link */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Find Us
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Guru Nanak Institute of Technology, Ibrahimpatnam, Hyderabad, Telangana 501506, India.
                </p>
                <Button asChild className="gradient-bg-green-red border-0 text-white">
                  <a href="https://www.gnithyd.ac.in" target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Official Website
                  </a>
                </Button>
              </CardContent>
            </Card>
            <div className="rounded-2xl overflow-hidden border border-border min-h-[300px]">
              <iframe
                title="GNIT Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.2550552278194!2d78.65646537788858!3d17.161531645534843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb09dabc04d5b9%3A0x333765a35bb449cd!2sGurunanak%20Institute%20of%20Technology%20-%20Ibrahimpatnam!5e1!3m2!1sen!2sin!4v1781993976048!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
