import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset())
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) return <Spinner />

  const ticketsArray = Array.isArray(tickets) ? tickets : []

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {ticketsArray.map((ticket) => (
          <TicketItem
            key={ticket._id}
            ticket={ticket}
          />
        ))}
      </div>
    </>
  )
}
export default Tickets
