import * as bcrypt from 'bcrypt'
import * as Jwt from '@hapi/jwt'

import { createContainer } from 'instances-container'
import CryptoRandomIdGenerator from './common/CryptoRandomIdGenerator'
import cryptoRandomString from 'crypto-random-string'
import BcryptPasswordHash from './security/BcryptPasswordHash'
import IdGenerator from '../Applications/common/IdGenerator'
import EncryptionHelper from '../Applications/security/EncryptionHelper'
import AuthenticationTokenManager from '../Applications/security/AuthenticationTokenManager'
import JwtTokenManager from './security/JwtTokenManager'
import AuthRepository from '../Domains/authentication/AuthRepository'
import AuthRepositoryPostgres from './repository/AuthRepositoryPostgres'
import pool from './database/postgres/pool'
import CategoryRepository from '../Domains/categories/CategoryRepository'
import CategoryRepositoryPostgres from './repository/CategoryRepositoryPostgres'
import PlanningRepository from '../Domains/plannings/PlanningRepository'
import PlanningRepositoryPostgres from './repository/PlanningRepositoryPostgres'
import SettingRepository from '../Domains/settings/SettingRepository'
import SettingRepositoryPostgres from './repository/SettingRepositoryPostgres'
import TransactionRepository from '../Domains/transactions/TransactionRepository'
import TransactionRepositoryPostgres from './repository/TransactionRepositoryPostgres'
import UserRepository from '../Domains/users/UserRepository'
import UserRepositoryPostgres from './repository/UserRepositoryPostgres'
import WalletRepository from '../Domains/wallets/WalletRepository'
import WalletRepositoryPostgres from './repository/WalletRepositoryPostgres'
import AuthenticationsUseCase from '../Applications/use_case/AuthenticationsUseCase'
import CategoriesUseCase from '../Applications/use_case/CategoriesUseCase'
import PlanningsUseCase from '../Applications/use_case/PlanningsUseCase'
import SettingsUseCase from '../Applications/use_case/SettingsUseCase'
import UsersUseCase from '../Applications/use_case/UsersUseCase'
import TransactionsUseCase from '../Applications/use_case/TransactionsUseCase'

// creating container
const container = createContainer()

// registering services and repository
container.register([
  {
    key: IdGenerator.name,
    Class: CryptoRandomIdGenerator,
    parameter: {
      dependencies: [
        {
          name: 'crypto',
          concrete: cryptoRandomString,
        },
      ],
    },
  },
  {
    key: EncryptionHelper.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt,
        },
      ],
    },
  },
  {
    key: AuthRepository.name,
    Class: AuthRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CategoryRepository.name,
    Class: CategoryRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: PlanningRepository.name,
    Class: PlanningRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: SettingRepository.name,
    Class: SettingRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: TransactionRepository.name,
    Class: TransactionRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: WalletRepository.name,
    Class: WalletRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
])

// registering use cases
container.register([
  {
    key: AuthenticationsUseCase.name,
    Class: AuthenticationsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'encryptionHelper',
          internal: EncryptionHelper.name,
        },
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'tokenManager',
          internal: JwtTokenManager.name,
        },
      ],
    },
  },
  {
    key: CategoriesUseCase.name,
    Class: CategoriesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
        {
          name: 'idGenerator',
          internal: IdGenerator.name,
        },
      ],
    },
  },
  {
    key: PlanningsUseCase.name,
    Class: PlanningsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'walletRepository',
          internal: WalletRepository.name,
        },
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
        {
          name: 'planningRepository',
          internal: PlanningRepository.name,
        },
        {
          name: 'idGenerator',
          internal: IdGenerator.name,
        },
      ],
    },
  },
  {
    key: SettingsUseCase.name,
    Class: SettingsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'settingRepository',
          internal: SettingRepository.name,
        },
        {
          name: 'idGenerator',
          internal: IdGenerator.name,
        },
      ],
    },
  },
  {
    key: TransactionsUseCase.name,
    Class: TransactionsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'transactionRepository',
          internal: TransactionRepository.name,
        },
        {
          name: 'walletRepository',
          internal: WalletRepository.name,
        },
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
        {
          name: 'idGenerator',
          internal: IdGenerator.name,
        },
      ],
    },
  },
  {
    key: UsersUseCase.name,
    Class: UsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'settingRepository',
          internal: SettingRepository.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'idGenerator',
          internal: IdGenerator.name,
        },
      ],
    },
  },
  {
    key: TransactionsUseCase.name,
    Class: TransactionsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'walletRepository',
          internal: WalletRepository.name,
        },
        {
          name: 'idGenerator',
          internal: IdGenerator.name,
        },
      ],
    },
  },
])

export default container
