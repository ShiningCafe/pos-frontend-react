import { render, screen } from '@testing-library/react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import SidebarLayout from './SidebarLayout'
import SidebarList from './SidebarList'

test('SidebarLayout with List Rendered', () => {

  render(
    <Router>
      <Routes>
        <Route index element={<SidebarLayout />} />
      </Routes>
    </Router>
  )

  SidebarList.forEach((el) => {
    const item = screen.getByText(el.title)
    expect(item).toBeInTheDocument()
  })
})
