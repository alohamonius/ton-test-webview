class ApiService {
  private apiUrl: string;

  constructor(baseApiUrl: string) {
    if (baseApiUrl === "") {
      throw new Error("Empty api url");
    }
    this.apiUrl = baseApiUrl;
  }

  async getBirthday(birthday: string): Promise<any> {
    const url = `${this.apiUrl}/get_birthday?birthday=${encodeURIComponent(
      birthday
    )}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching birthday:", error);
      throw error;
    }
  }

  async calculateMoons(birthday: string): Promise<any> {
    debugger;
    const url = `${this.apiUrl}/calculate_moons?birthday=${encodeURIComponent(
      birthday
    )}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error calculating moons:", error);
      throw error;
    }
  }

  async getNextFullMoon(birthday: string): Promise<MoonData> {
    const url = `${
      this.apiUrl
    }/api/next-full-moon?birthday=${encodeURIComponent(birthday)}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching next full moon:", error);
      throw error;
    }
  }

  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
}

export interface MoonData {
  nextFullMoonInDays: number; // Days until next full moon
  nextFullMoonDate: string; // ISO format full moon date
  moonPhase: number; // Phase of the moon (percentage illuminated)
  moonTypeNow: string; // Current moon type
  daysToNextMoon: number;
}

export default ApiService;
