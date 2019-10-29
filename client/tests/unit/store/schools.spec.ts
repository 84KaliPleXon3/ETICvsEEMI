import { MutationTree, GetterTree, ActionTree } from 'vuex';
import schools, { IStoreSchools } from '../../../src/store/modules/schools';
import axios from 'axios';
import config from '@/config';

const getters = schools.getters as GetterTree<IStoreSchools, any>;
const mutations = schools.mutations as MutationTree<IStoreSchools>;
const actions = schools.actions as any;

let state: IStoreSchools;

describe('Store - Questions', () => {
  beforeEach(() => {
    state = {
      schools: [],
    };
  });

  describe('Getters', () => {
    describe('#schools', () => {
      it('should get schools', () => {
        state.schools = [{ id: '1', name: 'test' }, { id: '2', name: 'test2' }];

        const data = getters.schools(state, null, null, null);

        expect(data).toStrictEqual(state.schools);
        expect(data.length).toBe(2);
      });
    });
  });

  describe('Mutations', () => {
    describe('#setSchools', () => {
      it('should set schools state', () => {
        mutations.setSchools(state, [
          { id: '1', name: 'test' },
          { id: '2', name: 'test2' },
        ]);

        expect(state.schools.length).toEqual(2);
        expect(typeof state.schools[0].id).toEqual('string');
        expect(typeof state.schools[0].name).toEqual('string');
      });
    });
  });

  describe('Actions', () => {
    describe('#fetchSchools', () => {
      it('should fetch schools from API', async () => {
        const payload = [{ id: '2', name: 'test' }];
        const axiosMock = jest.spyOn(axios, 'get').mockResolvedValue({
          data: { schools: payload },
        } as any);
        const commitMock = jest.fn();

        await actions.fetchSchools({ commit: commitMock });

        expect(axiosMock).toBeCalledTimes(1);
        expect(axiosMock).toHaveBeenCalledWith(`${config.apiUrl}/schools`);

        expect(commitMock).toBeCalledTimes(1);
        expect(commitMock).toHaveBeenCalledWith('setSchools', payload);
      });
    });
  });
});
