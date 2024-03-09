import { Command } from "commander";
import { fetchService, fetchServiceClass } from '../client-scripts/services/fetchService/fetchService';


const program = new Command();

const signIn = async ({ email, password }) => {
    const { result, error } = await fetchService.post({ url: '/auth/signIn', params: { email, password } });
    console.log({ result, error })
}

const getProducts = async () => {
    const { result, error } = await fetchService.get({ url: '/products' });
    console.log({ result, error })
}

const createProduct = async ({
    email,
    password,
    title = '',
    name = '',
    price = 0,
    rating = 0,
    description = '',
    shortDescription = '',
}) => {
    const { result, error } = await fetchService.post({ url: '/auth/signIn', params: { email, password } });

    if (error) {
        console.log(error);
        return;
    }

    if (!result?.token) {
        console.log('Пользователь не авторизован!');
    }

    const fetchServiceToken = fetchServiceClass({ token: result?.token })
    const cretateResult = await fetchServiceToken.post({
        url: '/admin/products',
        params: {
            title,
            name,
            price,
            rating,
            description,
            shortDescription,
        }
    });

    console.log({ cretateResult });
}

console.log('Welcome to "BSE API manager"');

program
    .version("1.0.0")
    .description("CLI for managing BSE API");

program.command('signIn')
    .description('Signin operation')
    .argument('<email>', 'email to signin')
    .argument('<password>', 'password to signin')
    .action((email: string, password: string) => {
        signIn({ email, password });
    });

program.command('getProducts')
    .description('Get products list operation')
    .action(() => {
        getProducts();
    });

program.command('createProduct')
    .description('Create product operation')
    .argument('<email>', 'email to signin')
    .argument('<password>', 'password to signin')
    .argument('<title>', 'title of product')
    .argument('<name>', 'name of product')
    .argument('<price>', 'price of product')
    .argument('<rating>', 'rating of product')
    .argument('<description>', 'description of product')
    .argument('<shortDescription>', 'short description of product')
    .action((
        email: string,
        password: string,
        title: string,
        name: string,
        price: number,
        rating: number,
        description: string,
        shortDescription: string
    ) => {
        createProduct({ email, password, title, name, price, rating, description, shortDescription });
    });

program.parse(process.argv);