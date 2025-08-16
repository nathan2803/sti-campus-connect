import { Button } from "@/components/ui/button";
import { Calendar, Building, Package, Users } from "lucide-react";
import heroImage from "@/assets/sti-campus-hero.jpg";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-hero min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-primary/90"></div>
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Campus Resource
              <span className="block text-accent">Management System</span>
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90 animate-fade-in-up">
              Streamline your academic resources with STI College Lucena's comprehensive
              booking and management platform for faculty and staff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold">
                <Calendar className="h-5 w-5 mr-2" />
                Book a Room Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold">
                <Package className="h-5 w-5 mr-2" />
                Request Equipment
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 animate-scale-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <Building className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-2xl font-bold mb-1">150+</h3>
              <p className="text-primary-foreground/80 text-sm">Rooms Available</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <Package className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-2xl font-bold mb-1">500+</h3>
              <p className="text-primary-foreground/80 text-sm">Equipment Items</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <Users className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-2xl font-bold mb-1">200+</h3>
              <p className="text-primary-foreground/80 text-sm">Faculty & Staff</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <Calendar className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-2xl font-bold mb-1">24/7</h3>
              <p className="text-primary-foreground/80 text-sm">Online Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;