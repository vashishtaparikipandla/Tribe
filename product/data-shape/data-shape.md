# Data Shape

1. **User**
   - Represents a person using the app. Has a profile, authentication details, and privacy settings.
2. **ServiceProvider**
   - The business or professional being recommended (e.g., Plumber, Doctor). Has a name, category, contact info, and aggregate scores.
3. **Recommendation**
   - The core action. A User recommends a ServiceProvider. Contains the specific ratings (Budget, Efficiency, Quality, Reliability, Overall) and text insights.
4. **Connection (Tribe Member)**
   - Represents the relationship between two Users (friend, neighbor, colleague), forming the basis of the trust network.
5. **Deal**
   - A curated offer or bundle provided by a ServiceProvider to a specific network or the platform.
