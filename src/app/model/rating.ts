export interface RatingToday {
    picture_id: number;
    url: string;
    description: string;
    point: number;
    uid: number;
    rankingyesterday: number;
    rankingtoday: number;
    rankdifferent: number;
  }
  export interface Vote {
    date: string;
    point: string;
    picture_id: number;
    description : string;
    url : string;
  }