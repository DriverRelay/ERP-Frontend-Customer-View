import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';

type ApplicationState = {
  signedIn: boolean,
};

const initialState: ApplicationState = {
  signedIn: false,
}

export const applicationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateSignedIn(signedIn: boolean): void {
      patchState(store, () => ({ signedIn }));
    }
  }))
);
