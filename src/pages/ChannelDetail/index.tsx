import Home from './components/Home';
import ProfileSection from './components/ProfileSection';

const ChannelDetail = () => {
  return (
    <div className="flex flex-col space-y-10 w-full">
      <ProfileSection />
      <Home />
    </div>
  );
};

export default ChannelDetail;
