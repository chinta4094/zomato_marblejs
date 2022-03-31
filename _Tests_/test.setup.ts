import { bindTo } from '@marblejs/core';
import { createHttpTestBed, createTestBedSetup } from '@marblejs/testing';
import listener from '../listener/httpListener';

const testBed = createHttpTestBed({ listener })

export const useTestBedSetup = createTestBedSetup({ testBed });