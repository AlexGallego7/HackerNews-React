const ContributionView = (props) => (
    <div class="content">
        <ol cls="inline gap">
            {props.contributions.map( (contribution) =>
                    <div>{contribution.title + ' (' +
                    contribution.url + ')'}</div>
            )}
        </ol>
    </div>
);

export default ContributionView
