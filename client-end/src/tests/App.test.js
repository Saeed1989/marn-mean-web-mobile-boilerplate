import React from 'react'
import {App} from '../App'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

beforeAll(() => null)
afterEach(() => null)
afterAll(() => null)

test('loads and displays greeting', async () => {
  render(<App/>);
  expect(screen.getByText('MERN Boilerplate')).toBeInTheDocument();
})
