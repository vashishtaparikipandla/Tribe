import { useState } from 'react';
import { AppShell } from '@astryxdesign/core/AppShell';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';
import { SideNav, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { Home, Search as SearchIcon, Users, User, Plus } from 'lucide-react';
import OnboardingFlow from '@/sections/prototype/Onboarding';
import AuthScreen from '@/sections/prototype/Auth';
import HomeScreen from '@/sections/prototype/Home';
import ProviderProfileScreen from '@/sections/prototype/ProviderProfile';
import AddRecommendationScreen from '@/sections/prototype/AddRecommendation';
import MyTribeScreen from '@/sections/prototype/MyTribe';
import SearchScreen from '@/sections/prototype/Search';
import UserProfileScreen from '@/sections/prototype/UserProfile';
import ProviderPassportScreen from '@/sections/prototype/ProviderPassport';
import ConsensusRequestScreen from '@/sections/prototype/ConsensusRequest';
import SavedProvidersScreen from '@/sections/prototype/SavedProviders';
import CategoryDirectoryScreen from '@/sections/prototype/CategoryDirectory';
import EditProfileScreen from '@/sections/prototype/EditProfile';
import MyRecommendationsScreen from '@/sections/prototype/MyRecommendations';
import TrustStatsScreen from '@/sections/prototype/TrustStats';
import HouseholdLinkingScreen from '@/sections/prototype/HouseholdLinking';
import NotificationPreferencesScreen from '@/sections/prototype/NotificationPreferences';
import TribeMemberProfileScreen from '@/sections/prototype/TribeMemberProfile';
import OffersAndRewardsScreen from '@/sections/prototype/OffersAndRewards';
import ServiceHistoryScreen from '@/sections/prototype/ServiceHistory';
import SharedProviderPreviewScreen from '@/sections/prototype/SharedProviderPreview';
import SocietyAdminScreen from '@/sections/prototype/SocietyAdmin';
import MyConsensusRequestsScreen from '@/sections/prototype/MyConsensusRequests';
import BookingFlowScreen from '@/sections/prototype/BookingFlow';
import MyBookingsScreen from '@/sections/prototype/MyBookings';
import LegalDocumentScreen from '@/sections/prototype/LegalDocument';
import PrivacyDataScreen from '@/sections/prototype/PrivacyData';
import HelpSupportScreen from '@/sections/prototype/HelpSupport';
import ReportTicketScreen from '@/sections/prototype/ReportTicket';

export type Screen = 'auth' | 'onboarding' | 'home' | 'search' | 'my-tribe' | 'provider-profile' | 'add-recommendation' | 'consensus-request' | 'provider-passport' | 'user-profile' | 'saved-providers' | 'category-directory' | 'edit-profile' | 'my-recommendations' | 'trust-stats' | 'household-linking' | 'notification-preferences' | 'tribe-member-profile' | 'offers-rewards' | 'service-history' | 'shared-provider-preview' | 'society-admin' | 'my-consensus-requests' | 'booking-flow' | 'my-bookings' | 'legal-document' | 'privacy-data' | 'help-support' | 'report-ticket';

export function PrototypePage() {
  const [screen, setScreen] = useState<Screen>('auth');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'tribe' | 'profile'>('home');

  const showShell = screen !== 'auth' && screen !== 'onboarding';

  const handleTabChange = (tab: 'home' | 'search' | 'tribe' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') setScreen('home');
    if (tab === 'search') setScreen('search');
    if (tab === 'tribe') setScreen('my-tribe');
    if (tab === 'profile') setScreen('user-profile');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'auth': return <AuthScreen onNavigate={setScreen} />;
      case 'onboarding': return <OnboardingFlow onDone={() => { setScreen('home'); setActiveTab('home'); }} />;
      case 'home': return <HomeScreen onNavigate={setScreen} />;
      case 'search': return <SearchScreen onNavigate={setScreen} />;
      case 'provider-profile': return <ProviderProfileScreen onNavigate={setScreen} />;
      case 'add-recommendation': return <AddRecommendationScreen onNavigate={setScreen} />;
      case 'my-tribe': return <MyTribeScreen />;
      case 'user-profile': return <UserProfileScreen onNavigate={setScreen} />;
      case 'provider-passport': return <ProviderPassportScreen onNavigate={setScreen} />;
      case 'consensus-request': return <ConsensusRequestScreen onNavigate={setScreen} />;
      case 'saved-providers': return <SavedProvidersScreen onNavigate={setScreen} />;
      case 'category-directory': return <CategoryDirectoryScreen onNavigate={setScreen} />;
      case 'edit-profile': return <EditProfileScreen onNavigate={setScreen} />;
      case 'my-recommendations': return <MyRecommendationsScreen onNavigate={setScreen} />;
      case 'trust-stats': return <TrustStatsScreen onNavigate={setScreen} />;
      case 'household-linking': return <HouseholdLinkingScreen onNavigate={setScreen} />;
      case 'notification-preferences': return <NotificationPreferencesScreen onNavigate={setScreen} />;
      case 'tribe-member-profile': return <TribeMemberProfileScreen onNavigate={setScreen} />;
      case 'offers-rewards': return <OffersAndRewardsScreen onNavigate={setScreen} />;
      case 'service-history': return <ServiceHistoryScreen onNavigate={setScreen} />;
      case 'shared-provider-preview': return <SharedProviderPreviewScreen onNavigate={setScreen} />;
      case 'society-admin': return <SocietyAdminScreen onNavigate={setScreen} />;
      case 'my-consensus-requests': return <MyConsensusRequestsScreen onNavigate={setScreen} />;
      case 'booking-flow': return <BookingFlowScreen onNavigate={setScreen} />;
      case 'my-bookings': return <MyBookingsScreen onNavigate={setScreen} />;
      case 'legal-document': return <LegalDocumentScreen onNavigate={setScreen} />;
      case 'privacy-data': return <PrivacyDataScreen onNavigate={setScreen} />;
      case 'help-support': return <HelpSupportScreen onNavigate={setScreen} />;
      case 'report-ticket': return <ReportTicketScreen onNavigate={setScreen} />;
      default: return <HomeScreen onNavigate={setScreen} />;
    }
  };

  if (!showShell) {
    return <AppShell contentPadding={0}>{renderScreen()}</AppShell>;
  }

  return (
    <AppShell
      contentPadding={4}
      topNav={
        <TopNav
          label="Main navigation"
          heading={<TopNavHeading heading="Tribe" />}
          startContent={
            <TopNavItem 
              label="Add Recommendation" 
              icon={<Plus size={16} />} 
              onClick={() => setScreen('add-recommendation')} 
            />
          }
        />
      }
      sideNav={
        <SideNav>
          <SideNavSection title="Main" isHeaderHidden>
            <SideNavItem
              label="Discover"
              icon={Home as any}
              isSelected={activeTab === 'home'}
              onClick={() => handleTabChange('home')}
            />
            <SideNavItem
              label="Search"
              icon={SearchIcon as any}
              isSelected={activeTab === 'search'}
              onClick={() => handleTabChange('search')}
            />
            <SideNavItem
              label="My Tribe"
              icon={Users as any}
              isSelected={activeTab === 'tribe'}
              onClick={() => handleTabChange('tribe')}
            />
            <SideNavItem
              label="Profile"
              icon={User as any}
              isSelected={activeTab === 'profile'}
              onClick={() => handleTabChange('profile')}
            />
          </SideNavSection>
        </SideNav>
      }
    >
      {renderScreen()}
    </AppShell>
  );
}
