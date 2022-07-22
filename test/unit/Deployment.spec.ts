import { LoadFixtureFunction } from '../types'
import { ethers } from 'hardhat'
import { PanaromaswapV3Staker } from '../../typechain'
import { panaromaswapFixture, PanaromaswapFixtureType } from '../shared/fixtures'
import { expect } from '../shared'
import { createFixtureLoader, provider } from '../shared/provider'

let loadFixture: LoadFixtureFunction

describe('unit/Deployment', () => {
  let context: PanaromaswapFixtureType

  before('loader', async () => {
    loadFixture = createFixtureLoader(provider.getWallets(), provider)
  })

  beforeEach('create fixture loader', async () => {
    context = await loadFixture(panaromaswapFixture)
  })

  it('deploys and has an address', async () => {
    const stakerFactory = await ethers.getContractFactory('PanaromaswapV3Staker')
    const staker = (await stakerFactory.deploy(
      context.factory.address,
      context.nft.address,
      2 ** 32,
      2 ** 32
    )) as PanaromaswapV3Staker
    expect(staker.address).to.be.a.string
  })

  it('sets immutable variables', async () => {
    const stakerFactory = await ethers.getContractFactory('PanaromaswapV3Staker')
    const staker = (await stakerFactory.deploy(
      context.factory.address,
      context.nft.address,
      2 ** 32,
      2 ** 32
    )) as PanaromaswapV3Staker

    expect(await staker.factory()).to.equal(context.factory.address)
    expect(await staker.nonfungiblePositionManager()).to.equal(context.nft.address)
    expect(await staker.maxIncentiveDuration()).to.equal(2 ** 32)
    expect(await staker.maxIncentiveStartLeadTime()).to.equal(2 ** 32)
  })
})
