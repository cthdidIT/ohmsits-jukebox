import uuid from "uuid/v4";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const VOTE = "VOTE";

enum DirectionVote {
  UP = 1,
  DOWN = -1
}

export const registerUser = (
  name: string,
  password: string
): RegisterUserAction => {
  return {
    type: AUTHENTICATE_USER,
    name
  };
};

interface RegisterUserAction {
  type: typeof AUTHENTICATE_USER;
  name: string;
}

export const vote = (
  voteDirection: DirectionVote,
  songId: string,
  username: string
): VoteAction => {
  return {
    type: VOTE,
    username,
    voteDirection,
    songId
  };
};

export interface VoteAction {
  type: typeof VOTE;
  username: string;
  voteDirection: DirectionVote;
  songId: string;
}
