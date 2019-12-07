export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const VOTE = "VOTE";

enum DirectionVote {
  UP = 1,
  DOWN = -1
}

export const registerUser = (username: string, password: string) => {
  return {
    type: AUTHENTICATE_USER,
    username,
    password
  };
};

export const vote = (
  token: string,
  voteDirection: DirectionVote,
  songId: string,
  userId: string
): VoteAction => {
  return {
    type: VOTE,
    userId,
    token,
    voteDirection,
    songId
  };
};

export interface VoteAction {
  type: typeof VOTE;
  token: string;
  userId: string;
  voteDirection: DirectionVote;
  songId: string;
}
