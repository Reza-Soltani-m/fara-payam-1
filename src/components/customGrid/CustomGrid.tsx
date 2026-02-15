import { Grid, Box } from '@mui/material';
import { Children, type PropsWithChildren } from 'react';

export type CustomGrid = {
    numberOfColumns?: '4' | '6';
};

const CustomGrid = ({
    children,
    numberOfColumns = '4',
}: PropsWithChildren<CustomGrid>) => {
    const columns: Record<any, any> = {
        '6': { xs: 2, sm: 4, md: 2 },
        '4': { xs: 3, sm: 4, md: 3 },
    };

    const items = Children.toArray(children)?.map((item) => (
        // <Grid size={{ xs: 2, sm: 4, md: 2 }}>{item}</Grid>
        <Grid size={columns[numberOfColumns]}>{item}</Grid>
    ));

    return (
        <Box sx={{ flexGrow: 1, padding: '15px' }}>
            <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {items}
            </Grid>
        </Box>
    );
};

export default CustomGrid;
