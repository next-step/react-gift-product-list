import { Spinner, SpinnerWrapper } from '@/styles/CommomStyle/Common.styled'

const Loading = ({ loading = true }: { loading?: boolean }) => {
    if (loading) return (
        <SpinnerWrapper>
            <Spinner />
        </SpinnerWrapper>
    )
    return <></>
}

export default Loading