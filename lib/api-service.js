export class APIService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchChannels() {
    try {
      const response = await fetch(`${this.baseUrl}/get-channels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  }

  async syncChannel(channelName) {
    try {
      const response = await fetch(`${this.baseUrl}/sync-single-channel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelName }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error syncing channel:', error);
      throw error;
    }
  }

  async unsyncChannel(channelName, channelUuid) {
    try {
      const response = await fetch(`${this.baseUrl}/unsync-channel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelName, channelUuid }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error unsyncing channel:', error);
      throw error;
    }
  }

  async syncAllChannels(channelsData) {
    try {
      const response = await fetch(`${this.baseUrl}/sync-channels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(channelsData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error syncing all channels:', error);
      throw error;
    }
  }
}
