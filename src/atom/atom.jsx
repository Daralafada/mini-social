import { atomWithStorage } from 'jotai/utils';

export const isLogAtom = atomWithStorage('isLog', false );

export const currentUserNameAtom = atomWithStorage('userName',undefined);
export const currentUserMailAtom = atomWithStorage('userMail',undefined);
export const currentUserIdAtom = atomWithStorage('userId',undefined);