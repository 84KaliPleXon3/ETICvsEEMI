import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Home from "../../../src/views/Home.vue";
import axios from "axios";
import config from "@/config";
import IQuestion from "@/models/question";

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
  modules: {
    questions: {
      namespaced: false,
      state: {
        index: 0,
        score: 0,
        question: []
      },
      getters: {
        index: () => 0,
        score: () => 0,
        schools: () => [],
        currentQuestion: (): IQuestion => {
          return { text: "test", answer: 1 };
        },
        questions: (): IQuestion[] => {
          return [];
        }
      },
      actions: {
        fetchQuestions: () => {},
        fetchSchools: () => {}
      }
    }
  }
});
shallowMount(Home, { mocks: { $store } });

describe("Views - Home", () => {
  it("should remove done todos", () => {
    const storeDispatchMock = spyOn($store, "dispatch");
    const axiosMock = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { questions: [] } } as any);

    // wrapper.find('.todoList__removeDone').trigger('click');
    expect(storeDispatchMock).toBeCalledTimes(2);
    expect(storeDispatchMock).toHaveBeenNthCalledWith(1, "fetchQuestions");
    expect(storeDispatchMock).toHaveBeenNthCalledWith(2, "fetchSchools");
    // expect(axiosMock).toBeCalledTimes(1);
    // expect(axiosMock).toHaveBeenCalledWith(`${config.apiUrl}/questions`);
  });
});
